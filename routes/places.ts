import { Router } from 'express';
import places from '../controllers/places';

const router = Router();

router.get('/:id', places.getPlaces);
router.post('/', places.addPlaces);
router.put('/:id', places.upgradePlaces);

export default router;
