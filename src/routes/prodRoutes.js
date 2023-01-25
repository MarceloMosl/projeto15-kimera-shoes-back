import { Router } from "express";
import { getProducts, postProducts } from "../controllers/prodController.js";
const router = Router();

router.get("/produtos", getProducts);
router.post("/produtos", postProducts);

export default router;
