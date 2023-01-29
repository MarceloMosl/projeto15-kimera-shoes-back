import { Router } from "express";
import {
  addProductOnCart,
  alterQuantitiesOnCart,
  deleteProductOnCart,
  getProductsOnCart,
} from "../controllers/cartController.js";
import { userMiddleware } from "../middleware/userMiddleware.js";

const router = Router();

// router.use(userMiddleware);

router.get("/carrinho", userMiddleware, getProductsOnCart);
router.post("/carrinho", userMiddleware, addProductOnCart);
router.put("/carrinho", userMiddleware, alterQuantitiesOnCart);
router.delete("/carrinho", userMiddleware, deleteProductOnCart);

export default router;
