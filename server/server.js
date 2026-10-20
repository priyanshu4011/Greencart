import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import productRoute from './routes/productRoute.js';
import sellerRoute from './routes/sellerRoute.js';
import userRoute from './routes/userRoute.js';
import cartRoute from './routes/cartRoute.js';
import addressRoute from './routes/addressRoute.js';
import { authUser } from './middleware/authUser.js';
import { getAddresses, addAddress, updateAddress, deleteAddress } from './controllers/addressController.js';
import { getUserOrders } from './controllers/userController.js';

dotenv.config();

const optionalAuth = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    req.user = { id: 'demo_user', role: 'user' };
    return next();
  }

  return authUser(req, res, next);
};

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors({
  origin: process.env.CLIENT_URL || '*',
  credentials: true,
}));
app.use(express.json({ limit: '2mb' }));

app.get('/api/health', (req, res) => {
  res.json({
    success: true,
    message: 'GreenCart backend is running',
    timestamp: new Date().toISOString(),
  });
});

app.use('/api/products', productRoute);
app.use('/api/users', userRoute);
app.use('/api/seller', sellerRoute);
app.use('/api/cart', authUser, cartRoute);
app.get('/api/orders', optionalAuth, getUserOrders);
app.get('/api/addresses', optionalAuth, getAddresses);
app.post('/api/addresses', optionalAuth, addAddress);
app.put('/api/addresses/:id', optionalAuth, updateAddress);
app.delete('/api/addresses/:id', optionalAuth, deleteAddress);
app.use('/api/address', optionalAuth, addressRoute);
app.use('/api/addresses', optionalAuth, addressRoute);

app.use((req, res) => {
  res.status(404).json({ success: false, message: 'Route not found' });
});

app.listen(PORT, () => {
  console.log(`GreenCart backend running on http://localhost:${PORT}`);
});
