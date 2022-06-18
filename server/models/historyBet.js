const mongoose = require('mongoose');

const historyBetSchema = new mongoose.Schema(
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
    pick: {
      type: String,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    gameId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Game',
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('HistoryBet', historyBetSchema);
