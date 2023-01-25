import db from "../config/dataBase.js";

export async function getProducts(req, res) {
  const cat = req.query.category;

  if (!cat) {
    try {
      const products = await db.collection("products").find().toArray();
      return res.send(products);
    } catch (error) {
      return res.send(error);
    }
  }

  try {
    const prodFilter = await db.collection("products").find({ cat }).toArray();
    return res.send(prodFilter);
  } catch (error) {
    return res.send(error);
  }
}

export async function postProducts(req, res) {
  const produto = req.body;

  try {
    await db.collection("products").insertOne(produto);

    res.status(200).send(produto);
  } catch (error) {
    res.send(error);
  }
}
