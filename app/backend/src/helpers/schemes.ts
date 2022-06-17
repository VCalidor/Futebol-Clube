const Joi = require('joi');

const productPostSchema = Joi.object({
  amount: Joi.string().min(3).required(),
  name: Joi.string().min(3).required(),
});

const loginPostSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
})

export {
  productPostSchema,
  loginPostSchema,
}; 