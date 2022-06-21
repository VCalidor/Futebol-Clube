import { Router } from 'express';
import Leaderboard from '../controllers/leaderboard';
import { loginPostVal, authVal } from '../middlewares/validators'

const router = Router();

const leaderboard = new Leaderboard();

router.get(
  '/home',
  leaderboard.getAll,
);

//router.get(
  //'/validate',
  //authVal,
  //login.loginValidate,
//);
  
export default router;