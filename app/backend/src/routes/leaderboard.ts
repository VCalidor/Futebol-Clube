import { Router } from 'express';
import Leaderboard from '../controllers/leaderboard';

const router = Router();

const leaderboard = new Leaderboard();

router.get(
  '/home',
  leaderboard.getAllHome,
);

router.get(
  '/away',
  leaderboard.getAllAway,
);

//router.get(
  //'/validate',
  //authVal,
  //login.loginValidate,
//);
  
export default router;