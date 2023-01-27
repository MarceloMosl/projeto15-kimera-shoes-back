import { Router } from "express";
import { 
    addProductOnCart,
    alterQuantitiesOnCart,
    deleteProductOnCart,
    getProductsOnCart
} from "../controllers/cartController.js";

const router = Router();

router.get("/carrinho", getProductsOnCart);
router.post("/carrinho", addProductOnCart);
router.put("/carrinho", alterQuantitiesOnCart);
router.delete("/carrinho", deleteProductOnCart);

export default router;