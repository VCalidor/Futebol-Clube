const bcrypt = require('bcryptjs');
const fs = require('fs');
import * as jwt from 'jsonwebtoken';
import { Request, Response } from 'express';
import UsersModel from '../database/models/user';
// import TeamsInterface from '../interfaces/TeamsInterface';
const jwtSecret =  fs.readFileSync('jwt.evaluation.key', 'utf8');

class LoginController {
  constructor() {}

  public login = async (req: Request, res: Response) => {
    const { email, password } = req.body;

    const user = await UsersModel.findOne({ where: { email } });

    if(!user) return res.status(401).json({ message: 'Incorrect email or password' })
  
    const correctPassword = await bcrypt.compare(password, user.password);

    if (!correctPassword) return res.status(401).json({ message: 'Incorrect email or password' });

    const token = jwt.sign({ email, id: user.id, role: user.role }, jwtSecret, { expiresIn: '1d' });

    return res.status(200).json({ 
      user: { id: user.id, username: user.username, role: user.role, email: user.email }, token
    });
  };

  public loginValidate = async (req: Request, res: Response) => {
    const matheusMoura = req.body.user.role;
    
    return res.status(200).json(matheusMoura);
  };
}

export default LoginController;