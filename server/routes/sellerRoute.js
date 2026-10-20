import express from 'express';
import { loginSeller, registerSeller, getSellerProfile } from '../controllers/sellerController.js';
import { authSeller } from '../middleware/authSeller.js';

const router = express.Router();

router.post('/register', registerSeller);
router.post('/login', loginSeller);
router.get('/profile', authSeller, getSellerProfile);

export default router;
