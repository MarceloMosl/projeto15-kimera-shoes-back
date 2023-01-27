import { Router } from "express";
import { addProductonCart } from "../controllers/cartController.js";

const router = Router();

router.post("/carrinho", addProductonCart);

export default router;