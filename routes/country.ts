import { Router } from 'express';
import country from '../controllers/country';
import extractJWT from '../JWT/extractJWT';

const router = Router();

router.get('/', country.getCountries);
router.get('/:id', country.getCountry);
router.post('/', country.addCountry);
router.put('/:id', country.upgradeCountry);

export default router;
