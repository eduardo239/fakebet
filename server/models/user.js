const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    role: {
      type: String,
      enum: ['admin', 'user', 'guest', 'support', 'moderator'],
      default: 'user',
    },
    bets: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Bet',
      },
    ],
    lastLogin: {
      type: Date,
      default: Date.now,
    },
    balance: {
      amount: {
        type: Number,
        default: 0,
      },
      currency: {
        type: String,
        default: 'BRL',
      },
      lastDeposit: {
        type: Date,
        default: Date.now,
      },
      browser: String,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('User', userSchema);
