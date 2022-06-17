import { Router } from 'express';
import Teams from '../controllers/teams';

const router = Router();

const teams = new Teams();

router.get(
  '/',
  teams.getAll,
);

router.get(
  '/:id',
  teams.getAll,
);

export default router;