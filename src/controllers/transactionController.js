const axios = require('axios');
const Transaction = require('../models/Transaction');

exports.addTransaction = async (req, res) => {
    try {
        const { title, amount, category, date } = req.body;
        const transaction = new Transaction({ userId: req.user.id, title, amount, category, date });
        await transaction.save();
        res.status(201).json(transaction);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

exports.getTransactions = async (req, res) => {
    try {
        const transactions = await Transaction.find({ userId: req.user.id });
        res.json(transactions);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.predictExpenses = async (req, res) => {
    try {
        const transactions = await Transaction.find({ userId: req.user.id });

        const expenses = transactions.map(txn => ({
            amount: txn.amount,
            category: txn.category,
            date: txn.date
        }));

        const response = await axios.post('http://localhost:5001/predict', {
            user_id: req.user.id,
            expenses: expenses
        });

        res.json(response.data);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
