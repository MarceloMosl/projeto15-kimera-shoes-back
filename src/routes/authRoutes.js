import { Router } from "express";
import { login } from "../controllers/authController";
import { cadastro } from "../controllers/authController";
const router = Router ()

router.post("/login", login)
router.post("/cadastro", cadastro)

export default router