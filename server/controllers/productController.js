import bcrypt from 'bcryptjs';

export const products = [
  {
    _id: 'p1',
    name: 'Potato 500g',
    category: 'Vegetables',
    price: 25,
    offerPrice: 20,
    image: ['https://images.unsplash.com/photo-1518977676601-b53f82aba655?auto=format&fit=crop&w=900&q=80'],
    description: ['Fresh and organic', 'Rich in carbohydrates', 'Ideal for curries and fries'],
    inStock: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    _id: 'p2',
    name: 'Tomato 1 kg',
    category: 'Vegetables',
    price: 40,
    offerPrice: 35,
    image: ['https://images.unsplash.com/photo-1546094096-0df4bcaaa337?auto=format&fit=crop&w=900&q=80'],
    description: ['Juicy and ripe', 'Rich in Vitamin C', 'Perfect for salads and sauces'],
    inStock: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    _id: 'p3',
    name: 'Red Apple 1 kg',
    category: 'Fruits',
    price: 180,
    offerPrice: 150,
    image: ['https://images.unsplash.com/photo-1567306226416-28f0efdc88ce?auto=format&fit=crop&w=900&q=80'],
    description: ['Crisp and juicy', 'Good for health', 'Perfect for breakfast'],
    inStock: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    _id: 'p4',
    name: 'Amul Milk 1L',
    category: 'Dairy',
    price: 65,
    offerPrice: 58,
    image: ['https://images.unsplash.com/photo-1550583724-b2692b85b150?auto=format&fit=crop&w=900&q=80'],
    description: ['Pure and fresh', 'Rich in calcium', 'Good for tea'],
    inStock: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

const normalizeProduct = (product) => {
  const cleanProduct = { ...product };
  cleanProduct._id = String(cleanProduct._id || `p_${Date.now()}`);
  cleanProduct.name = cleanProduct.name || 'Unnamed Product';
  cleanProduct.category = cleanProduct.category || 'General';
  cleanProduct.price = Number(cleanProduct.price || 0);
  cleanProduct.offerPrice = Number(cleanProduct.offerPrice || cleanProduct.price || 0);
  cleanProduct.image = Array.isArray(cleanProduct.image) ? cleanProduct.image : [cleanProduct.image].filter(Boolean);
  cleanProduct.description = Array.isArray(cleanProduct.description)
    ? cleanProduct.description
    : String(cleanProduct.description || 'Fresh and quality product').split(/\n|[,;]\s*/).filter(Boolean);
  cleanProduct.inStock = cleanProduct.inStock !== false;
  cleanProduct.createdAt = cleanProduct.createdAt || new Date().toISOString();
  cleanProduct.updatedAt = new Date().toISOString();
  return cleanProduct;
};

export const getProducts = (req, res) => {
  return res.json({ success: true, products });
};

export const getProductById = (req, res) => {
  const product = products.find((item) => item._id === req.params.id);

  if (!product) {
    return res.status(404).json({ success: false, message: 'Product not found' });
  }

  return res.json({ success: true, product });
};

export const createProduct = (req, res) => {
  const newProduct = normalizeProduct(req.body);
  products.unshift(newProduct);
  return res.status(201).json({ success: true, product: newProduct });
};

export const updateProduct = (req, res) => {
  const index = products.findIndex((item) => item._id === req.params.id);

  if (index === -1) {
    return res.status(404).json({ success: false, message: 'Product not found' });
  }

  const updatedProduct = normalizeProduct({ ...products[index], ...req.body, _id: req.params.id });
  products[index] = updatedProduct;

  return res.json({ success: true, product: updatedProduct });
};

export const deleteProduct = (req, res) => {
  const index = products.findIndex((item) => item._id === req.params.id);

  if (index === -1) {
    return res.status(404).json({ success: false, message: 'Product not found' });
  }

  const [removed] = products.splice(index, 1);
  return res.json({ success: true, message: 'Product deleted', product: removed });
};
