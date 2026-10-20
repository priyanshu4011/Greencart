import express from 'express';
import { addAddress, deleteAddress, getAddresses, updateAddress } from '../controllers/addressController.js';
import { authUser } from '../middleware/authUser.js';

const router = express.Router();

router.get('/', authUser, getAddresses);
router.post('/', authUser, addAddress);
router.put('/:id', authUser, updateAddress);
router.delete('/:id', authUser, deleteAddress);

export default router;
