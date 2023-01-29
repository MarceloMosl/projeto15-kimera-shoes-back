import { ObjectId } from "mongodb";
import db from "../config/dataBase.js";


export async function postRegisterSale(req, res) {
    try {
        const productsOnCart = req.body;
        const userId = res.locals.user._id;
        
        for (const product of productsOnCart) {
            const remove = Number(product.quant) * -1;
            await db.collection("products").updateOne({_id: ObjectId(product.productId)}, {$inc: {quant: remove}});
        }

        await db.collection("cart").deleteMany({userId});

        await db.collection("sales").insertOne({
            userId,
            products: value,
        })
        
        res.sendStatus(201);
    } catch (err) {
        console.log(`postRegisterSale function error: ${err}`);
        res.sendStatus(500);
    }
}