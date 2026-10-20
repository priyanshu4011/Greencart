import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

const sellers = [];

const generateToken = (seller) =>
  jwt.sign(
    { id: seller.id, email: seller.email, role: 'seller' },
    process.env.JWT_SECRET || 'greencart_super_secret_key_2026',
    { expiresIn: process.env.JWT_EXPIRES_IN || '7d' }
  );

export const registerSeller = async (req, res) => {
  const { name, email, password, shopName } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ success: false, message: 'Seller name, email and password are required.' });
  }

  const existingSeller = sellers.find((seller) => seller.email === email);
  if (existingSeller) {
    return res.status(409).json({ success: false, message: 'Seller already exists.' });
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const newSeller = {
    id: `seller_${Date.now()}`,
    name,
    email,
    password: hashedPassword,
    shopName: shopName || `${name}'s Shop`,
    role: 'seller',
    createdAt: new Date().toISOString(),
  };

  sellers.push(newSeller);
  const token = generateToken(newSeller);

  return res.status(201).json({
    success: true,
    token,
    seller: { id: newSeller.id, name: newSeller.name, email: newSeller.email, shopName: newSeller.shopName, role: newSeller.role },
  });
};

export const loginSeller = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ success: false, message: 'Email and password required.' });
  }

  const seller = sellers.find((item) => item.email === email);
  if (!seller) {
    return res.status(404).json({ success: false, message: 'Seller not found.' });
  }

  const isPasswordMatch = await bcrypt.compare(password, seller.password);
  if (!isPasswordMatch) {
    return res.status(401).json({ success: false, message: 'Invalid seller credentials.' });
  }

  const token = generateToken(seller);

  return res.json({
    success: true,
    token,
    seller: { id: seller.id, name: seller.name, email: seller.email, shopName: seller.shopName, role: seller.role },
  });
};

export const getSellerProfile = (req, res) => {
  return res.json({ success: true, seller: req.user });
};
