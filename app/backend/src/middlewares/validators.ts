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

  next();
}

function matchesPostVal(req: Request, res: Response, next: NextFunction) {
  const match = req.body;
  const { error } = matchPostSchema.validate(match);

  if (error) {
    return res.status(400).json({ message: error.details[0].message  });
  }

  next();
}

function matchesPatchVal(req: Request, res: Response, next: NextFunction) {
  const goals = req.body;
  const { error } = matchPatchSchema.validate(goals);

  if (error) {
    return res.status(400).json({ message: error.details[0].message  });
  }

  next();
}


const authVal = async (req: Request, res: Response, next: NextFunction) => {
  const jwtSecret = async () => fs.readFile('jwt.evaluation.key', 'utf-8');
  try {
    const SECRET = await jwtSecret();
    const token = req.headers.authorization;

    if(!token) return res.status(401).json({ message: 'Token not found' });

    const decode = jwt.verify(token, SECRET);
    req.body.user = decode;

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