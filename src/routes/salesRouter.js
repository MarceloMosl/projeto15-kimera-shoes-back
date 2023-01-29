import { Router } from "express";
import { postRegisterSale } from "../controllers/salesController.js";
import { userMiddleware } from "../middleware/userMiddleware.js";

const router = Router();

router.post("/sales", userMiddleware, postRegisterSale);

export default router;