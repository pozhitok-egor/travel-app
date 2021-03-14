import { Router } from 'express';
import rating from '../controllers/ratings';
import extractJWT from '../JWT/extractJWT';

const router = Router();

router.get('/:id', rating.getRating);
router.get('/user/:id', extractJWT, rating.getUserRating);
router.post('/:id', extractJWT, rating.addRating, rating.upgradeRating);

export default router;
