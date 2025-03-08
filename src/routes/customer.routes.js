const express = require('express');
const { registerCustomer } = require('../controllers/customer.controller');
const { login } = require('../controllers/customer.controller');
const { getTransactionHistory } = require('../controllers/customer.controller');
const { authenticate } = require('../middleware/auth');
const router = express.Router();

router.post('/register', registerCustomer);
router.post('/login', login);
router.get('/transactions', authenticate, getTransactionHistory);

module.exports = router;