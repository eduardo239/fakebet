const mongoose = require('mongoose');

const historyBalanceSchema = new mongoose.Schema(
  {
    type: {
      type: String,
      required: true,
      enum: ['deposit', 'withdrawal'],
    },
    amount: {
      type: Number,
      required: true,
    },
    paymentMethod: {
      type: String,
      required: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('HistoryBalance', historyBalanceSchema);
