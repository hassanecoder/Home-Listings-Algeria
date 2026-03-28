import { Router, type IRouter } from "express";
import { db } from "@workspace/db";
import { categoriesTable, listingsTable } from "@workspace/db";
import { eq, sql } from "drizzle-orm";

const router: IRouter = Router();

router.get("/", async (req, res) => {
  try {
    const categories = await db.select().from(categoriesTable);
    const counts = await db
      .select({
        categoryId: listingsTable.categoryId,
        count: sql<number>`count(*)`,
      })
      .from(listingsTable)
      .groupBy(listingsTable.categoryId);

    const countMap = Object.fromEntries(counts.map((c) => [c.categoryId, Number(c.count)]));

    res.json(
      categories.map((c) => ({
        ...c,
        listingCount: countMap[c.id] ?? 0,
      }))
    );
  } catch (err) {
    req.log.error({ err }, "Error getting categories");
    res.status(500).json({ error: "Internal server error" });
  }
});

export default router;
