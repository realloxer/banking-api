const { Customer, Transaction } = require('../models');
const jwt = require('jsonwebtoken');

exports.dummyLogin = (req, res) => {
    const { username, password } = req.body;
  
    if (username === 'manager' && password === '123456') {
      const token = jwt.sign({ role: 'manager' }, process.env.JWT_SECRET, { expiresIn: '1h' });
      return res.json({ token });
    }
  
    res.status(401).json({ error: 'Invalid credentials' });
};

exports.getTotalBankBalance = async (req, res) => {
  try {
    const totalBalance = await Customer.sum('balance');
    res.json({ totalBalance });
  } catch (error) {
    console.error('Error fetching total bank balance:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const isValidUUID = (uuid) => /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(uuid);
const { Op } = require('sequelize');

exports.getAllTransactions = async (req, res) => {
    try {
      const { sortBy = 'createdAt', order = 'DESC', type, customerId } = req.query;
  
      const validSortFields = ['amount', 'type', 'createdAt'];
      const validOrder = ['ASC', 'DESC'];
  
      if (!validSortFields.includes(sortBy) || !validOrder.includes(order.toUpperCase())) {
        return res.status(400).json({ error: 'Invalid sort field or order' });
      }
  
      if (customerId && !isValidUUID(customerId)) {
        return res.status(400).json({ error: 'Invalid customerId format' });
      }
  
      const where = {};
      if (type) where.type = type;
  
      if (customerId) {
        where[Op.or] = [
          { customerId }, 
          { receiverId: customerId },
        ];
      }
  
      const transactions = await Transaction.findAll({
        where,
        order: [[sortBy, order.toUpperCase()]],
        include: [
          { model: Customer, as: 'sender', attributes: ['id', 'name'] },
          { model: Customer, as: 'receiver', attributes: ['id', 'name'] },
        ],
      });
  
      res.json({ transactions });
    } catch (error) {
      console.error('Error fetching all transactions:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
};