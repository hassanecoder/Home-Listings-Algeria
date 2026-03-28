import { Router, type IRouter } from "express";
import { db } from "@workspace/db";
import { listingsTable, categoriesTable, wilayasTable } from "@workspace/db";
import { sql } from "drizzle-orm";

const router: IRouter = Router();

router.get("/", async (req, res) => {
  try {
    const [totalListings, totalWilayas, totalCategories, totalSellers, newToday] =
      await Promise.all([
        db.select({ count: sql<number>`count(*)` }).from(listingsTable),
        db.select({ count: sql<number>`count(*)` }).from(wilayasTable),
        db.select({ count: sql<number>`count(*)` }).from(categoriesTable),
        db.select({ count: sql<number>`count(distinct ${listingsTable.sellerPhone})` }).from(listingsTable),
        db.select({ count: sql<number>`count(*)` }).from(listingsTable).where(
          sql`${listingsTable.createdAt} > now() - interval '1 day'`
        ),
      ]);

    res.json({
      totalListings: Number(totalListings[0]?.count ?? 0),
      totalSellers: Number(totalSellers[0]?.count ?? 0),
      wilayas: Number(totalWilayas[0]?.count ?? 0),
      categories: Number(totalCategories[0]?.count ?? 0),
      newToday: Number(newToday[0]?.count ?? 0),
    });
  } catch (err) {
    req.log.error({ err }, "Error getting stats");
    res.status(500).json({ error: "Internal server error" });
  }
});

export default router;
