import { Router } from 'express';
import user from '../controllers/user';
import extractJWT from '../JWT/extractJWT';
import github from '../controllers/social/github';
import * as multer from "multer";

const upload = multer({ dest: "uploads/" })

const router = Router();

router.get('/', upload.none(), extractJWT, user.getUser);
router.post('/register', upload.none(), user.register, user.login);
router.post('/login', upload.none(), user.login);
router.put('/', upload.none(), extractJWT, user.update);
router.put('/upload', upload.single('avatar'), extractJWT, user.addPhoto);
router.get('/all', upload.none(), user.getAllUsers);

export default router;
