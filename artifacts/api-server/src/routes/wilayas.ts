import { Router, type IRouter } from "express";
import { db } from "@workspace/db";
import { wilayasTable, listingsTable } from "@workspace/db";
import { sql } from "drizzle-orm";

const router: IRouter = Router();

router.get("/", async (req, res) => {
  try {
    const wilayas = await db.select().from(wilayasTable).orderBy(wilayasTable.code);
    const counts = await db
      .select({
        wilayaId: listingsTable.wilayaId,
        count: sql<number>`count(*)`,
      })
      .from(listingsTable)
      .groupBy(listingsTable.wilayaId);

    const countMap = Object.fromEntries(counts.map((c) => [c.wilayaId, Number(c.count)]));

    res.json(
      wilayas.map((w) => ({
        ...w,
        listingCount: countMap[w.id] ?? 0,
      }))
    );
  } catch (err) {
    req.log.error({ err }, "Error getting wilayas");
    res.status(500).json({ error: "Internal server error" });
  }
});

export default router;
