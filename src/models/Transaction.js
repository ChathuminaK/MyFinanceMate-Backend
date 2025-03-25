const mongoose = require('mongoose');

const TransactionSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    title: String,
    amount: Number,
    category: String,
    date: Date
});

module.exports = mongoose.model('Transaction', TransactionSchema);
