import joi from "joi";

export const authCadastroSchema = joi.object({
  name: joi.string().required(),
  lastName: joi.string().required(),
  email: joi.string().email().required(),
  password: joi.string().required(),
  confirmPassword: joi.required("password"),
  street: joi.string().required(),
  number: joi.number().required(),
  city: joi.string().required(),
  state: joi.string().required(),
});

export const authLoginSchema = joi.object({
  email: joi.string().email().required(),
  password: joi.string().required(),
});
