import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

const users = [];
const otpRequests = new Map();

const generateToken = (user) =>
  jwt.sign(
    { id: user.id, email: user.email, role: user.role || 'user' },
    process.env.JWT_SECRET || 'greencart_super_secret_key_2026',
    { expiresIn: process.env.JWT_EXPIRES_IN || '7d' }
  );

export const registerUser = async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ success: false, message: 'Name, email, and password are required.' });
  }

  const existingUser = users.find((user) => user.email === email);
  if (existingUser) {
    return res.status(409).json({ success: false, message: 'User already exists.' });
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = {
    id: `user_${Date.now()}`,
    name,
    email,
    password: hashedPassword,
    role: 'user',
    createdAt: new Date().toISOString(),
  };

  users.push(newUser);
  const token = generateToken(newUser);

  return res.status(201).json({
    success: true,
    token,
    user: { id: newUser.id, name: newUser.name, email: newUser.email, role: newUser.role },
  });
};

export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ success: false, message: 'Email and password are required.' });
  }

  const user = users.find((item) => item.email === email);
  if (!user) {
    return res.status(404).json({ success: false, message: 'User not found.' });
  }

  const isPasswordMatch = await bcrypt.compare(password, user.password);
  if (!isPasswordMatch) {
    return res.status(401).json({ success: false, message: 'Incorrect password.' });
  }

  const token = generateToken(user);

  return res.json({
    success: true,
    token,
    user: { id: user.id, name: user.name, email: user.email, role: user.role },
  });
};

export const getCurrentUser = (req, res) => {
  return res.json({ success: true, user: req.user });
};

export const getUserOrders = (req, res) => {
  return res.json({ success: true, orders: [] });
};

export const requestOtp = (req, res) => {
  const phone = String(req.body.phone || '').replace(/\D/g, '').slice(-10);

  if (phone.length !== 10) {
    return res.status(400).json({ success: false, message: 'Enter a valid 10-digit phone number.' });
  }

  const otp = String(Math.floor(100000 + Math.random() * 900000));
  otpRequests.set(phone, { otp, expiresAt: Date.now() + 5 * 60 * 1000 });

  return res.json({
    success: true,
    message: 'OTP generated successfully.',
    ...(process.env.NODE_ENV !== 'production' ? { devOtp: otp } : {}),
  });
};

export const verifyOtp = (req, res) => {
  const phone = String(req.body.phone || '').replace(/\D/g, '').slice(-10);
  const otp = String(req.body.otp || '').trim();
  const request = otpRequests.get(phone);

  if (!request || request.expiresAt < Date.now() || request.otp !== otp) {
    return res.status(401).json({ success: false, message: 'Invalid or expired OTP.' });
  }

  otpRequests.delete(phone);
  const user = { id: `phone_${phone}`, phone, role: 'user' };
  const token = generateToken(user);

  return res.json({ success: true, token, user });
};
