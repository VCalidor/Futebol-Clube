import { Router } from 'express';
import Login from '../controllers/login';
import { loginPostVal, authVal } from '../middlewares/validators'

const router = Router();

const login = new Login();

router.post(
  '/',
  loginPostVal,
  login.login,
);

router.get(
  '/validate',
  authVal,
  login.loginValidate,
);
  
export default router;