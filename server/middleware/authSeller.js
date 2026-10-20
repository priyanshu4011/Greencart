import jwt from 'jsonwebtoken';

export const authSeller = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ success: false, message: 'Seller access denied. No token provided.' });
  }

  try {
    const token = authHeader.split(' ')[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'greencart_super_secret_key_2026');

    if (decoded.role !== 'seller' && decoded.role !== 'admin') {
      return res.status(403).json({ success: false, message: 'Only sellers can access this route.' });
    }

    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ success: false, message: 'Invalid or expired seller token.' });
  }
};
