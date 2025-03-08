const express = require('express');
const { authenticateManager } = require('../middleware/auth');
const { dummyLogin, getTotalBankBalance, getAllTransactions } = require('../controllers/manager.controller');

const router = express.Router();

router.post('/login', dummyLogin);
router.get('/total-balance', authenticateManager, getTotalBankBalance);
router.get('/transactions', authenticateManager, getAllTransactions);

module.exports = router;

