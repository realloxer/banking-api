const { Customer } = require('../models');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { Op } = require('sequelize');

exports.registerCustomer = async (req, res) => {
  try {
    const { name, nationalId, balance, password } = req.body;

    // Check if customer exists
    const existingCustomer = await Customer.findOne({ where: { nationalId } });
    if (existingCustomer) {
      return res.status(400).json({ error: 'Customer already exists' });
    }

    // Create customer
    const customer = Customer.create({ name, nationalId, balance, password });
    if (!customer) {
      return es.status(500).json({ error: 'Internal server error' });
    }
    res.status(201).json({ message: 'Registration successful' });

  } catch (error) {
    console.error('Registration Error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

exports.login = async (req, res) => {
    try {
      const { nationalId, password } = req.body;
  
      const customer = await Customer.findOne({ where: { nationalId } });
      if (!customer) return res.status(404).json({ message: 'Customer not found' });
  
      const isValidPassword = await bcrypt.compare(password, customer.password);
      if (!isValidPassword) return res.status(401).json({ message: 'Invalid credentials' });
  
      const token = jwt.sign(
        { id: customer.id }, 
        process.env.JWT_SECRET,
        { expiresIn: '1h' }
      );
      res.status(200).json({ message: 'Login successful', token });
    } catch (error) {
      console.error('Login Error:', error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
};

const { Transaction } = require('../models');

exports.getTransactionHistory = async (req, res) => {
  try {
    const { sortBy = 'createdAt', order = 'DESC', type } = req.query;
    const customerId = req.user.id;

    const validSortFields = ['amount', 'type', 'createdAt'];
    if (!validSortFields.includes(sortBy)) {
      return res.status(400).json({ error: 'Invalid sort field' });
    }

    const validOrder = ['ASC', 'DESC'];
    if (!validOrder.includes(order.toUpperCase())) {
      return res.status(400).json({ error: 'Invalid sort order' });
    }

    // Transactions where the user is the receiver or the sender
    const where = {
      [Op.or]: [
        { customerId }, 
        { receiverId: customerId } 
      ]
    };

    if (type) {
      where.type = type;
    }

    // Fetch transactions
    const transactions = await Transaction.findAll({
      where,
      order: [[sortBy, order.toUpperCase()]],
    });

    res.json({ transactions });
  } catch (error) {
    console.error('Transaction History Error:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
