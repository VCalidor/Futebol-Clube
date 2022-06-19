const Joi = require('joi');

const loginPostSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
})

const matchPostSchema = Joi.object({
  homeTeam: Joi.number().integer().min(0).required(),
  awayTeam: Joi.number().integer().min(0).required(),
  homeTeamGoals: Joi.number().integer().min(0).required(),
  awayTeamGoals: Joi.number().integer().min(0).required(),
  inProgress: Joi.boolean().required(),

});

export {
  loginPostSchema,
  matchPostSchema,
}; 