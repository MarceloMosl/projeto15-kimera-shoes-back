import express, { json } from "express";
import cors from "cors";
import db from "./config/dataBase.js";

const app = express();
const PORT = process.env.PORT || 5002;
app.use(cors());
app.use(json());

app.get("/teste", async (req, res) => {
  const teste = await db.collection("users").find({}).toArray();
  res.send({ teste });
});

app.post("/teste", async (req, res) => {
  try {
    await db.collection("users").insertOne(req.body);
    res.sendStatus(200);
  } catch (error) {
    res.send(error);
  }
});

app.listen(PORT, () => console.log("Server ON"));
