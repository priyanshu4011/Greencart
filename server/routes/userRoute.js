import express from 'express';
import { loginUser, registerUser, getCurrentUser, getUserOrders, requestOtp, verifyOtp } from '../controllers/userController.js';
import { authUser } from '../middleware/authUser.js';

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.post('/otp/request', requestOtp);
router.post('/otp/verify', verifyOtp);
router.get('/me', authUser, getCurrentUser);
router.get('/orders', authUser, getUserOrders);

export default router;
