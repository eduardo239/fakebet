const mongoose = require('mongoose');

const betSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    gameId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Game',
      required: true,
    },
    pick: {
      type: String,
      required: true,
    },
    value: {
      type: Number,
      required: true,
    },
    odd: {
      type: Number,
      required: true,
    },
    profit: {
      type: Number,
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    win: {
      type: Boolean,
      default: null,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Bet', betSchema);
