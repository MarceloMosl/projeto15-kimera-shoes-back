import express, { json } from "express";
import cors from "cors";
import prodRouter from "./routes/prodRoutes.js";
import authRoutes from "./routes/authRoutes.js"

const app = express();
const PORT = process.env.PORT || 5002;
app.use(cors());
app.use(json());

app.use([prodRouter]);
app.use(authRoutes);

app.listen(PORT, () => console.log("Server ON"));
