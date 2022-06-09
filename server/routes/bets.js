const express = require('express');
const router = express.Router();
const Bet = require('../models/bet');
const { SUCCESS, ERROR_MESSAGE, USER_REMOVED } = require('../utils/constants');

router.post('/add', (req, res, next) => {
  const newBet = new Bet({
    userId: req.body.userId,
    gameId: req.body.gameId,
    pick: req.body.pick,
    value: req.body.value,
    odd: req.body.odd,
    profit: req.body.profit,
    createdAt: new Date(),
    win: req.body.win,
  });

  newBet.save((err) => {
    if (err) {
      res.json({ success: false, message: ERROR_MESSAGE, err });
    } else {
      res.json({ success: true, message: SUCCESS, bet: newBet });
    }
  });
});

router.delete('/remove/:id', (req, res, next) => {
  Bet.findByIdAndDelete(req.params.id, (err, bet) => {
    if (err) {
      res.json({ success: false, message: ERROR_MESSAGE, err });
    } else {
      if (!bet) res.json({ success: false, message: `BET NOT FOUND` });
      else res.json({ success: true, message: `BET REMOVED` });
    }
  });
});

router.get('/all', (req, res, next) => {
  Bet.find({}, (err, bets) => {
    if (err) {
      res.json({ success: false, message: ERROR_MESSAGE, err });
    } else if (bets.length === 0) {
      res.json({ success: false, message: `BETS NOT FOUND` });
    } else {
      res.json({ success: true, message: SUCCESS, users: bets });
    }
  }).sort('-createdAt');
});

router.get('/:id', (req, res, next) => {
  Bet.findById(req.params.id, (err, bet) => {
    if (err) {
      res.json({ success: false, message: ERROR_MESSAGE, err });
    } else if (!bet) {
      res.json({ success: false, message: `BET NOT FOUND` });
    } else {
      res.json({ success: true, message: SUCCESS, user: bet });
    }
  })
    .sort('-createdAt')
    .populate('userId');
});
module.exports = router;
