const mongoose = require('mongoose');

const teamSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    type: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Sport',
      required: true,
    },
    emblem: {
      type: String,
      required: false,
      default: '',
    },
    shortName: {
      type: String,
      required: true,
      maxlength: 3,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Team', teamSchema);
