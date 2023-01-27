import { rmSync } from "fs";
import { ObjectId } from "mongodb";
import db from "../config/dataBase.js";

export async function addProductOnCart(req, res) {
    const {product_id, quant} = req.body;
    let auth = req.headers.authentication;
    auth = auth.replace("Bearer ", "");

    if (!auth) return res.status(401).send("Usuário não autorizado");

    try {
        const userId = await db.collection("sessions").findOne({token: auth});
        if (!userId) return res.status(404).send("Usuário não autorizado");

        const product = await db.collection("products").findOne({_id: ObjectId(product_id)}, { quant: 1 });
        if(!product) return res.status(404).send("Produto não encontrado");

        if (Number(quant) > Number(product.quant)) return res.sendStatus(409);

        await db.collection("cart").insertOne({userId: userId.userId, productId: product._id, quant});
        res.sendStatus(201);
    } catch (error) {
        console.log(`addProductonCart Function Error: ${error}`);
        res.sendStatus(500);
    }
}

export async function alterQuantitiesOnCart(req, res){
    const {product_id, quant} = req.body;
    let auth = req.headers.authentication;
    auth = auth.replace("Bearer", "");

    if (!auth) return res.status(401).send("Usuário não autorizado");

    try {
        const userId = await db.collection("sessions").findOne({token: auth});
        if (!userId) return res.status(404).send("Usuário não autorizado");

        const product = await db.collection("products").findOne({_id: ObjectId(product_id)}, { quant: 1 });
        if(!product) return res.status(404).send("Produto não encontrado 2");

        if (Number(quant) > Number(product.quant)) return res.sendStatus(409);

        await db.collection("cart").updateOne({userId: userId.userId, productId: product._id}, {$set: {quant}});
        res.send(200);
    } catch (error) {
        console.log(`alterQuantitiesOnCart Function Error: ${error}`);
        res.sendStatus(500);
    }
}