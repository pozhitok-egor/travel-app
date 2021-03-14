import { Router } from 'express';
import rating from '../controllers/ratings';
import extractJWT from '../JWT/extractJWT';

const router = Router();

router.get('/:id', rating.getRating);
router.get('/place/:id', extractJWT, rating.getUserRating);
router.post('/', extractJWT, rating.addRating, rating.upgradeRating);

export default router;
