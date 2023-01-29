import { ObjectId } from "mongodb";
import db from "../config/dataBase.js";

export async function getProductsOnCart(req, res){

    try {
        const userId = res.locals.user._id;
        const result = [];

        const productsOnCart = await db.collection("cart").find({userId}).toArray();

        for (const product of productsOnCart) {
            const productData = await db.collection("products").findOne({_id: product.productId});
            result.push({
                productId: (productData._id).toString(),
                title: productData.title,
                quant: product.quant,
                size: product.size,
                image: productData.img,
                price: productData.price,
            });
        }

        res.send(result);
    } catch (error) {
        console.log(`getProductsOnCart Function Error: ${error}`);
        res.sendStatus(500);
    }
}

export async function addProductOnCart(req, res) {
    const {product_id, size, quant} = req.body;

    try {
        const userId = res.locals.user._id;
        
        const product = await db.collection("products").findOne({_id: ObjectId(product_id)}, { quant: 1 });
        if(!product) return res.status(404).send("Produto não encontrado");

        const alreadyOnCart = await db.collection("cart").findOne({userId, productId: product._id});
        if (alreadyOnCart) return res.status(409).send("Produto já está no carrinho");

        if (Number(quant) > Number(product.quant)) return res.sendStatus(409);

        await db.collection("cart").insertOne({userId, productId: product._id, quant, size});
        res.sendStatus(201);
    } catch (error) {
        console.log(`addProductonCart Function Error: ${error}`);
        res.sendStatus(500);
    }
}

export async function alterQuantitiesOnCart(req, res){
    const {product_id, quant} = req.body;

    try {
        const userId = res.locals.user._id;

        const product = await db.collection("products").findOne({_id: ObjectId(product_id)}, { quant: 1 });
        if(!product) return res.status(404).send("Produto não encontrado 2");

        if (Number(quant) > Number(product.quant)) return res.sendStatus(409);

        await db.collection("cart").updateOne({userId, productId: product._id}, {$set: {quant}});
        res.send(200);
    } catch (error) {
        console.log(`alterQuantitiesOnCart Function Error: ${error}`);
        res.sendStatus(500);
    }
}

export async function deleteProductOnCart(req, res){
    const {product_id} = req.body;

    try {
        const userId = res.locals.user._id;
        if (!userId) return res.status(404).send("Usuário não autorizado");

        await db.collection("cart").deleteOne({userId, productId: ObjectId(product_id)});
        res.sendStatus(202);
    } catch (error) {
        console.log(`deleteProductOnCart Function Error: ${error}`);
        res.sendStatus(500);
    }
}