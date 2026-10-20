const addresses = [
  {
    _id: 'a1',
    name: 'Home',
    phone: '9876543210',
    street: '12 Rose Avenue',
    city: 'Bengaluru',
    state: 'Karnataka',
    zipcode: 560001,
    country: 'India',
  },
  {
    _id: 'a2',
    name: 'Office',
    phone: '9988776655',
    street: '45 Market Road',
    city: 'Hyderabad',
    state: 'Telangana',
    zipcode: 500001,
    country: 'India',
  },
];

export const getAddresses = (req, res) => {
  return res.json({ success: true, addresses });
};

export const addAddress = (req, res) => {
  const { name, phone, street, city, state, zipcode, country } = req.body;

  if (!name || !phone || !street || !city || !state || !zipcode) {
    return res.status(400).json({ success: false, message: 'Please fill all required address fields.' });
  }

  const newAddress = {
    _id: `a_${Date.now()}`,
    name,
    phone,
    street,
    city,
    state,
    zipcode: Number(zipcode),
    country: country || 'India',
  };

  addresses.unshift(newAddress);
  return res.status(201).json({ success: true, address: newAddress });
};

export const updateAddress = (req, res) => {
  const { id } = req.params;
  const index = addresses.findIndex((item) => item._id === id);

  if (index === -1) {
    return res.status(404).json({ success: false, message: 'Address not found.' });
  }

  addresses[index] = { ...addresses[index], ...req.body, _id: id };
  return res.json({ success: true, address: addresses[index] });
};

export const deleteAddress = (req, res) => {
  const { id } = req.params;
  const index = addresses.findIndex((item) => item._id === id);

  if (index === -1) {
    return res.status(404).json({ success: false, message: 'Address not found.' });
  }

  const [removed] = addresses.splice(index, 1);
  return res.json({ success: true, message: 'Address deleted', address: removed });
};
