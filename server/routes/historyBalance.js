const express = require('express');
const router = express.Router();
const HistoryBalance = require('../models/historyBalance');
const { SUCCESS, ERROR_MESSAGE } = require('../utils/constants');

router.post('/add', (req, res, next) => {
  const historyBalance = new HistoryBalance({
    type: req.body.type,
    amount: req.body.amount,
    userId: req.body.userId,
    paymentMethod: req.body.paymentMethod,
  });

  historyBalance.save((err) => {
    if (err) {
      res.json({ success: false, message: ERROR_MESSAGE, err });
    } else {
      res.json({ success: true, message: SUCCESS, history: historyBalance });
    }
  });
});

// get all balances by user id
router.get('/user/:id', (req, res, next) => {
  HistoryBalance.find({ userId: req.params.id }, (err, historyBalance) => {
    if (err) {
      res.json({ success: false, message: ERROR_MESSAGE, err });
    }
    if (!historyBalance) {
      res.json({ success: false, message: ERROR_MESSAGE, err });
    } else {
      res.json({ success: true, message: SUCCESS, history: historyBalance });
    }
  }).sort('-createdAt');
});

// get all balances from all users
router.get('/all', (req, res, next) => {
  HistoryBalance.find({}, (err, historyBalance) => {
    if (err) {
      res.json({ success: false, message: ERROR_MESSAGE, err });
    }
    if (!historyBalance) {
      res.json({ success: false, message: ERROR_MESSAGE, err });
    } else {
      res.json({ success: true, message: SUCCESS, history: historyBalance });
    }
  }).sort('-createdAt');
});

module.exports = router;
