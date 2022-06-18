import { Router } from 'express';
import Matches from '../controllers/matches';

const router = Router();

const matches = new Matches();

router.get(
  '/',
  matches.getAll,
);

export default router;