import { Router } from 'express';
import github from '../controllers/social/github';

const router = Router();

router.get('/', github.getData, github.login, github.register);

export default router;
