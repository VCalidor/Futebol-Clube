import { Router } from 'express';
import Matches from '../controllers/matches';

const router = Router();

const matches = new Matches();

router.get(
  '/',
  matches.getAll,
);

router.post(
  '/',
  matches.create,
);

router.patch(
  '/:id',
  matches.update,
);

router.patch(
  '/:id/finish',
  matches.finish,
);


export default router;