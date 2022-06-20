import { Router } from 'express';
import Matches from '../controllers/matches';
import { authVal, matchesPostVal, matchesPatchVal } from '../middlewares/validators'


const router = Router();

const matches = new Matches();

router.get(
  '/',
  matches.getAll,
);

router.post(
  '/',
  authVal,
  matchesPostVal,
  matches.create,
);

router.patch(
  '/:id',
  matchesPatchVal,
  matches.update,
);

router.patch(
  '/:id/finish',
  matches.finish,
);


export default router;