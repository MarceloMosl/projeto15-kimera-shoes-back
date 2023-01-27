import { Router } from "express";
import { addProductOnCart, alterQuantitiesOnCart, deleteProductOnCart } from "../controllers/cartController.js";

const router = Router();

router.post("/carrinho", addProductOnCart);
router.put("/carrinho", alterQuantitiesOnCart);
router.delete("/carrinho", deleteProductOnCart);

export default router;