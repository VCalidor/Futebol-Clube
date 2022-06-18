const bcrypt = require('bcryptjs');
import { Request, Response } from 'express';
import UsersModel from '../database/models/user';
// import TeamsInterface from '../interfaces/TeamsInterface';

class LoginController {
  constructor() {}

  public login = async (req: Request, res: Response) => {
    const { email, password } = req.body;

    const user = await UsersModel.findOne({ where: { email } });

    if(!user) return res.status(401).json({ message: 'Incorrect email or password' })
  
    const correctPassword = await bcrypt.compare(password, user.password);

    if (!correctPassword) return res.status(401).json({ message: 'Incorrect email or password' });

    return res.status(200).json({
      user: {id: user.id, username: user.username, role: user.role, email: user.email,
      },
    });
  };
}

export default LoginController;