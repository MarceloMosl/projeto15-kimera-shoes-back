import db from "../config/dataBase.js";

export async function userMiddleware(req, res, next) {
  const { authorization } = req.headers;
  const token = authorization?.replace('Bearer', "").trim();

  if (!token) return res.status(401).send("token inexistente");

  try {
    const session = await db.collection("sessions").findOne({ token });
    if (!session) return res.status(401).send("Não existe essa sessão");

    const user = await db.collection("users").findOne({ _id: session.userId });
    if (!user) return res.status(401).send("Usuário não cadastrado");

    res.locals.user = user;
    next();
  } catch (error) {
    console.log("erro no middleware");
    console.log(error);
    return res.sendStatus(500);
  }
}
