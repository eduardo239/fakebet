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
    teamAOdd: {
      type: Number,
      required: true,
    },
    teamBOdd: {
      type: Number,
      required: true,
    },
    winner: {
      type: Number,
      required: false,
      default: null,
    },
    type: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Sport',
      required: true,
    },
    date: {
      type: Date,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Game', gameSchema);
