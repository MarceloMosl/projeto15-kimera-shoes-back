import joi from "joi"

export const authCadastroSchema = joi.object({
    name: joi.string().required().min(3),
    lasName: joi.string().required().min(3),
    email: joi.string().email().required().min(3),
    password: joi.string().required().min(4),
    confirmPassword: joi.required("password"),
    street: joi.string().required().min(3),
    number: joi.number().required(),
    city: joi.string().required().min(3),
    state: joi.string().required().min(3)
})

export const authLoginSchema = joi.object({
    email: joi.string().email().required(),
    password: joi.string().required()
})