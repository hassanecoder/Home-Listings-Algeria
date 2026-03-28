import { Router, type IRouter } from "express";
import healthRouter from "./health";
import listingsRouter from "./listings";
import categoriesRouter from "./categories";
import wilayasRouter from "./wilayas";
import statsRouter from "./stats";

const router: IRouter = Router();

router.use(healthRouter);
router.use("/listings", listingsRouter);
router.use("/categories", categoriesRouter);
router.use("/wilayas", wilayasRouter);
router.use("/stats", statsRouter);

export default router;
