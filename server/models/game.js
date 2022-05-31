const mongoose = require('mongoose');

const gameSchema = new mongoose.Schema(
  {
    teamAId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Team',
      required: true,
    },
    teamBId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Team',
      required: true,
    },
    teamAScore: {
      type: Number,
      required: true,
    },
    teamBScore: {
      type: Number,
      required: true,
    },
    winner: {
      type: String,
      required: false,
      default: '',
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Game', gameSchema);
