import express from 'express';
import {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
} from '../controllers/productController.js';
import { authSeller } from '../middleware/authSeller.js';

const router = express.Router();

router.get('/', getProducts);
router.get('/:id', getProductById);
router.post('/', authSeller, createProduct);
router.put('/:id', authSeller, updateProduct);
router.delete('/:id', authSeller, deleteProduct);

export default router;
