import express, { json } from "express";
import cors from "cors";
import prodRouter from "./routes/prodRoutes.js";
import authRoutes from "./routes/authRoutes.js"
import cartRoutes from "./routes/cartRoutes.js";
import salesRoutes from "./routes/salesRouter.js";

const app = express();
const PORT = process.env.PORT || 5002;
app.use(cors());
app.use(json());

app.use([prodRouter]);
app.use(cartRoutes);
app.use(authRoutes);
app.use(salesRoutes);

app.listen(PORT, () => console.log("Server ON"));
