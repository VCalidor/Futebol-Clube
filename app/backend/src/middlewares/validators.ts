import * as jwt from 'jsonwebtoken';
import * as fs from 'fs/promises';
import { Request, Response, NextFunction } from 'express';
import { loginPostSchema, matchPostSchema, matchPatchSchema } from '../helpers/schemes';

function loginPostVal(req: Request, res: Response, next: NextFunction) {
  const user = req.body;
  const { error } = loginPostSchema.validate(user);

  if (error) {
    return res.status(400).json({ message: 'All fields must be filled' });
  }

  return next();
}

function matchesPostVal(req: Request, res: Response, next: NextFunction) {
  const { homeTeam, awayTeam, homeTeamGoals, awayTeamGoals } = req.body;
  const { error } = matchPostSchema.validate({ homeTeam, awayTeam, homeTeamGoals, awayTeamGoals });

  if (error) {
    return res.status(400).json({ message: error.details[0].message  });
  }

  return next();
}

function matchesPatchVal(req: Request, res: Response, next: NextFunction) {
  const goals = req.body;
  const { error } = matchPatchSchema.validate(goals);

  if (error) {
    return res.status(400).json({ message: error.details[0].message  });
  }

  return next();
}


const authVal = async (req: Request, res: Response, next: NextFunction) => {
  const jwtSecret = async () => fs.readFile('jwt.evaluation.key', 'utf-8');
  try {
    const JWTsecret = await jwtSecret();
    const token = req.headers.authorization;

    if(!token) return res.status(401).json({ message: 'Token not found' });

    const morena = jwt.verify(token, JWTsecret);
    req.body.user = morena;

    return next();
  } catch (err) {
    return res.status(401).json({ message: 'Token invalid' });
  }
}

export {
  loginPostVal,
  matchesPostVal,
  matchesPatchVal,
  authVal,
}; 