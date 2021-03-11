import { Router } from 'express';
import rating from '../controllers/ratings';
import extractJWT from '../JWT/extractJWT';

const router = Router();

router.get('/:id', rating.getRating);
router.post('/', extractJWT, rating.addRating, rating.upgradeRating);

export default router;
