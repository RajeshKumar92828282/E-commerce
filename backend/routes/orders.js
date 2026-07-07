const express = require('express');
const router = express.Router();
const Order = require('../models/order');
const Cart = require('../models/cart');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');

const getUserIdFromToken = (req) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) throw new Error('No token provided');
  const token = authHeader.split(' ')[1];
  const decoded = jwt.verify(token, process.env.JWT_SECRET || 'secretkey');
  if (!decoded || !decoded.id) throw new Error('Invalid token');
  return decoded.id;
};

// Create order (protected)
router.post('/', async (req, res) => {
  try {
    const tokenUserId = getUserIdFromToken(req);
    const { userId, items, total, method, address } = req.body;
    if (!userId || tokenUserId !== userId) return res.status(403).json({ error: 'Unauthorized' });
    if (!Array.isArray(items) || items.length === 0) return res.status(400).json({ error: 'No items provided' });

    const order = new Order({ userId, items, total, method, address, status: 'Processing' });
    const saved = await order.save();

    // Remove items from cart for this user
    try {
      await Cart.deleteMany({ userId });
    } catch (e) {
      console.warn('Unable to clear cart after order:', e.message);
    }

    res.status(201).json({ message: 'Order placed', order: saved });
  } catch (err) {
    console.error('Order create error:', err);
    const status = err.message === 'No token provided' ? 401 : 500;
    res.status(status).json({ error: err.message });
  }
});

// Get orders for a user (protected)
router.get('/:userId', async (req, res) => {
  try {
    const tokenUserId = getUserIdFromToken(req);
    const { userId } = req.params;
    if (!mongoose.Types.ObjectId.isValid(userId)) return res.status(400).json({ error: 'Invalid User ID' });
    if (tokenUserId !== userId) return res.status(403).json({ error: 'Unauthorized' });
    const orders = await Order.find({ userId }).sort({ createdAt: -1 });
    res.json(orders);
  } catch (err) {
    console.error('Orders fetch error:', err);
    const status = err.message === 'No token provided' ? 401 : 500;
    res.status(status).json({ error: err.message });
  }
});

module.exports = router;
