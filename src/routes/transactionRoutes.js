const express = require('express');
const { addTransaction, getTransactions, predictExpenses } = require('../controllers/transactionController');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();
router.post('/add', authMiddleware, addTransaction);
router.get('/', authMiddleware, getTransactions);
router.get('/predict-expenses', authMiddleware, predictExpenses);

module.exports = router;
