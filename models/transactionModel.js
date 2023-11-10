const mongoose = require('mongoose');

const TransactionSchema = new mongoose.Schema({
  userId: mongoose.Schema.Types.ObjectId,
  amount: Number,
  sourceCurrency: String,
  targetCurrency: String,
  convertedAmount: Number,
  timestamp: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Transaction', TransactionSchema);
