import { products } from './productController.js';

const carts = new Map();

const getUserCart = (userId) => carts.get(userId) || [];

export const getCart = (req, res) => {
  const cart = getUserCart(req.user.id);
  return res.json({ success: true, cart });
};

export const addToCart = (req, res) => {
  const { productId, quantity = 1 } = req.body;
  const product = products.find((item) => item._id === productId);

  if (!product) {
    return res.status(404).json({ success: false, message: 'Product not found' });
  }

  const cart = getUserCart(req.user.id);
  const existingItem = cart.find((item) => item.productId === productId);

  if (existingItem) {
    existingItem.quantity += Number(quantity || 1);
  } else {
    cart.push({ productId, quantity: Number(quantity || 1), product });
  }

  carts.set(req.user.id, cart);
  return res.status(201).json({ success: true, cart });
};

export const updateCartItem = (req, res) => {
  const { productId, quantity } = req.body;
  const cart = getUserCart(req.user.id);
  const item = cart.find((entry) => entry.productId === productId);

  if (!item) {
    return res.status(404).json({ success: false, message: 'Cart item not found' });
  }

  item.quantity = Number(quantity || 1);
  carts.set(req.user.id, cart);
  return res.json({ success: true, cart });
};

export const removeCartItem = (req, res) => {
  const { productId } = req.params;
  const cart = getUserCart(req.user.id).filter((item) => item.productId !== productId);
  carts.set(req.user.id, cart);
  return res.json({ success: true, cart });
};

export const clearCart = (req, res) => {
  carts.set(req.user.id, []);
  return res.json({ success: true, cart: [] });
};
