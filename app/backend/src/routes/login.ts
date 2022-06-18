import { Router } from 'express';
import Login from '../controllers/login';
import { loginPostVal } from '../middlewares/validators'

const router = Router();

const login = new Login();

router.post(
  '/',
  loginPostVal,
  login.login,
);

export default router;