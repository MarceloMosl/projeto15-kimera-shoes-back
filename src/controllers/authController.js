import db from "../config/dataBase.js";
import { authCadastroSchema } from "../schemas/authSchema.js";
import { authLoginSchema } from "../schemas/authSchema.js";
import bcrypt from "bcrypt";
import { v4 as uuid } from "uuid";

export async function login(req, res) {
  try {
    const user = req.body;
    const validate = authLoginSchema.validate(user);

    if (validate.error) {
      return res.status(422).send("Preencha todos os campos");
    }

    const checkUser = await db
      .collection("users")
      .findOne({ email: user.email });
    if (!checkUser) {
      return res.status(422).send("email não cadastrado");
    }

    const passwordBcrypt = bcrypt.compareSync(
      user.password,
      checkUser.password
    );
    if (passwordBcrypt) {
      const token = uuid();
      await db
        .collection("sessions")
        .insertOne({ token, userID: verificaUser._id });
      return res.status(200).send({ token, name: checkUser.name });
    }
    res.status(200).send("Login realizado com sucesso");
  } catch (error) {
    console.error("Erro ao cadastrar usuário");
    res.status(500).send(error);
  }
}

export async function cadastro(req, res) {
  try {
    const newUser = req.body;
    const passwordHash = bcrypt.hashSync(newUser.password, 10);
    const validate = authCadastroSchema.validate(newUser);

    if (validate.error) {
      return res.status(422).send("Preencha todos os campos");
    }

    await db.collection("users").insertOne({
      name: newUser.name,
      lasname: newUser.lastName,
      email: newUser.email,
      password: passwordHash,
      street: newUser.street,
      number: newUser.number,
      city: newUser.city,
      state: newUser.state,
    });
    res.status(200).send("Cadastro realizado com sucesso");
  } catch (error) {
    console.error(error);
    res.status(500).send("Erro ao cadastrar usuário");
  }
}
