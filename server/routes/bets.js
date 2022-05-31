const express = require('express');
const router = express.Router();
const Bet = require('../models/bet');
const {
  ERROR_MESSAGE,
  SUCCESS,
  USER_NOT_FOUND,
  USER_REMOVED,
} = require('../utils/constants');

router.post('/add', (req, res, next) => {
  const newBet = new Bet({
    userId: req.body.userId,
    pick: req.body.pick,
    value: req.body.value,
    odd: req.body.odd,
    profit: req.body.profit,
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
      if (!bet) res.json({ success: false, message: USER_NOT_FOUND });
      else res.json({ success: true, message: USER_REMOVED });
    }
  });
});

router.get('/all', (req, res, next) => {
  Bet.find({}, (err, bets) => {
    if (err) {
      res.json({ success: false, message: ERROR_MESSAGE, err });
    } else if (bets.length === 0) {
      res.json({ success: false, message: USER_NOT_FOUND });
    } else {
      res.json({ success: true, message: SUCCESS, users: bets });
    }
  });
});

router.get('/:id', (req, res, next) => {
  Bet.findById(req.params.id, (err, bet) => {
    if (err) {
      res.json({ success: false, message: ERROR_MESSAGE, err });
    } else if (!bet) {
      res.json({ success: false, message: USER_NOT_FOUND });
    } else {
      res.json({ success: true, message: SUCCESS, user: bet });
    }
  });
});
module.exports = router;
