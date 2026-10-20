import express from 'express';
import {
  getCart,
  addToCart,
  updateCartItem,
  removeCartItem,
  clearCart,
} from '../controllers/cartController.js';

const router = express.Router();

router.get('/', getCart);
router.post('/', addToCart);
router.put('/', updateCartItem);
router.delete('/:productId', removeCartItem);
router.delete('/', clearCart);

export default router;
