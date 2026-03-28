import { Router, type IRouter } from "express";
import { db } from "@workspace/db";
import {
  listingsTable,
  categoriesTable,
  wilayasTable,
  messagesTable,
} from "@workspace/db";
import { eq, and, gte, lte, ilike, sql, inArray } from "drizzle-orm";

const router: IRouter = Router();

// GET /listings
router.get("/", async (req, res) => {
  try {
    const {
      categoryId,
      wilayaId,
      type,
      minPrice,
      maxPrice,
      search,
      featured,
      limit = "20",
      offset = "0",
    } = req.query as Record<string, string>;

    const conditions: ReturnType<typeof eq>[] = [];

    if (categoryId) conditions.push(eq(listingsTable.categoryId, categoryId));
    if (wilayaId) conditions.push(eq(listingsTable.wilayaId, wilayaId));
    if (type === "sell" || type === "rent")
      conditions.push(eq(listingsTable.type, type));
    if (minPrice)
      conditions.push(gte(listingsTable.price, minPrice));
    if (maxPrice)
      conditions.push(lte(listingsTable.price, maxPrice));
    if (featured === "true")
      conditions.push(eq(listingsTable.featured, true));
    if (search) {
      conditions.push(
        ilike(listingsTable.title, `%${search}%`)
      );
    }

    const whereClause = conditions.length > 0 ? and(...conditions) : undefined;

    const [listings, categories, wilayas] = await Promise.all([
      db
        .select()
        .from(listingsTable)
        .where(whereClause)
        .limit(parseInt(limit))
        .offset(parseInt(offset))
        .orderBy(sql`${listingsTable.featured} DESC, ${listingsTable.createdAt} DESC`),
      db.select().from(categoriesTable),
      db.select().from(wilayasTable),
    ]);

    const catMap = Object.fromEntries(categories.map((c) => [c.id, c]));
    const wMap = Object.fromEntries(wilayas.map((w) => [w.id, w]));

    const totalResult = await db
      .select({ count: sql<number>`count(*)` })
      .from(listingsTable)
      .where(whereClause);

    const enriched = listings.map((l) => ({
      ...l,
      price: parseFloat(l.price),
      area: l.area ? parseFloat(l.area) : undefined,
      currency: "DZD",
      categoryName: catMap[l.categoryId]?.name ?? "",
      categoryIcon: catMap[l.categoryId]?.icon ?? "",
      wilayaName: wMap[l.wilayaId]?.name ?? "",
    }));

    res.json({
      listings: enriched,
      total: Number(totalResult[0]?.count ?? 0),
      limit: parseInt(limit),
      offset: parseInt(offset),
    });
  } catch (err) {
    req.log.error({ err }, "Error getting listings");
    res.status(500).json({ error: "Internal server error" });
  }
});

// GET /listings/:id
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const [listing] = await db
      .select()
      .from(listingsTable)
      .where(eq(listingsTable.id, id))
      .limit(1);

    if (!listing) {
      res.status(404).json({ error: "Listing not found" });
      return;
    }

    // Increment views
    await db
      .update(listingsTable)
      .set({ views: listing.views + 1 })
      .where(eq(listingsTable.id, id));

    const [[category], [wilaya]] = await Promise.all([
      db.select().from(categoriesTable).where(eq(categoriesTable.id, listing.categoryId)),
      db.select().from(wilayasTable).where(eq(wilayasTable.id, listing.wilayaId)),
    ]);

    res.json({
      ...listing,
      price: parseFloat(listing.price),
      area: listing.area ? parseFloat(listing.area) : undefined,
      currency: "DZD",
      categoryName: category?.name ?? "",
      categoryIcon: category?.icon ?? "",
      wilayaName: wilaya?.name ?? "",
      views: listing.views + 1,
    });
  } catch (err) {
    req.log.error({ err }, "Error getting listing");
    res.status(500).json({ error: "Internal server error" });
  }
});

// POST /listings
router.post("/", async (req, res) => {
  try {
    const body = req.body;
    const id = `lst_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

    const [created] = await db
      .insert(listingsTable)
      .values({
        id,
        title: body.title,
        description: body.description,
        price: String(body.price),
        type: body.type,
        categoryId: body.categoryId,
        wilayaId: body.wilayaId,
        city: body.city,
        address: body.address,
        images: body.images ?? [],
        bedrooms: body.bedrooms,
        bathrooms: body.bathrooms,
        area: body.area ? String(body.area) : null,
        furnished: body.furnished,
        condition: body.condition,
        sellerName: body.sellerName,
        sellerPhone: body.sellerPhone,
        sellerType: body.sellerType ?? "individual",
        agencyName: body.agencyName,
        amenities: body.amenities ?? [],
        featured: false,
        verified: false,
      })
      .returning();

    res.status(201).json({ ...created, price: parseFloat(created.price), currency: "DZD" });
  } catch (err) {
    req.log.error({ err }, "Error creating listing");
    res.status(500).json({ error: "Internal server error" });
  }
});

// POST /listings/:id/contact
router.post("/:id/contact", async (req, res) => {
  try {
    const { id } = req.params;
    const { name, phone, email, message } = req.body;

    const [listing] = await db
      .select({ id: listingsTable.id })
      .from(listingsTable)
      .where(eq(listingsTable.id, id))
      .limit(1);

    if (!listing) {
      res.status(404).json({ error: "Listing not found" });
      return;
    }

    await db.insert(messagesTable).values({
      listingId: id,
      senderName: name,
      senderPhone: phone,
      senderEmail: email,
      message,
    });

    res.json({ success: true, message: "Votre message a été envoyé avec succès." });
  } catch (err) {
    req.log.error({ err }, "Error sending message");
    res.status(500).json({ error: "Internal server error" });
  }
});

export default router;
