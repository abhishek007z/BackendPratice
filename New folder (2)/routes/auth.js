import express from 'express';
import { register, verifyEmail, login } from '../controllers/authController.js';
import multer from 'multer';
const upload = multer({ dest: 'uploads/' });

const router = express.Router();

router.post('/register', upload.single('profileImage'), register);
router.get('/verify/:code', verifyEmail);
router.post('/login', login);

export default router;
