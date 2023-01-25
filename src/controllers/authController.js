import db from "../config/dataBase";
import { authCadastroSchema } from "../schemas/authSchema";
import { authLoginSchema } from "../schemas/authSchema";
import bcrypt from "bcrypt"
import {v4 as uuid} from "uuid"

export async function login(req, res){

}

export async function cadastro (req, res){ 
    try {
        const newUser = req.body
        const passwordHash = bcrypt.hashSync(newUser.password, 10)
        const validate = authCadastroSchema.validate(newUser)

        if(validate.error){
            return res.status(422).send("Preencha todos os campos")
        }

        await db.collection("users").insertOne({
            name: newUser.name,
            lasname: newUser.lastName,
            email: newUser.email,
            password: passwordHash,
            street: newUser.street,
            number: newUser.number,
            city: newUser.city,
            state: newUser.state
        })
        res.status(200).send("Cadastro realizado com sucesso")
    } catch (error) {
        
    }
}