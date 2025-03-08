const express = require('express');
const { authenticate } = require('../middleware/auth');
const { deposit, withdraw, transfer } = require('../controllers/transaction.controller');

const router = express.Router();

router.post('/deposit', authenticate, deposit);
router.post('/withdraw', authenticate, withdraw);
router.post('/transfer', authenticate, transfer);

module.exports = router;
