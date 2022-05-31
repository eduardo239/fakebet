const express = require('express');
const router = express.Router();
const Game = require('../models/game');
const {
  ERROR_MESSAGE,
  SUCCESS,
  USER_NOT_FOUND,
  USER_REMOVED,
} = require('../utils/constants');

router.post('/add', (req, res, next) => {
  console.log(req.body);
  const newGame = new Game({
    teamAId: req.body.teamAId,
    teamBId: req.body.teamBId,
    teamAScore: req.body.teamAScore,
    teamBScore: req.body.teamBScore,
    createdAt: req.body.createdAt,
    winner: req.body.winner,
  });

  // FIXME: error 11000
  newGame.save((err) => {
    if (err) {
      res.json({ success: false, message: ERROR_MESSAGE, err });
    } else {
      res.json({ success: true, message: SUCCESS, game: newGame });
    }
  });
});

router.put('/edit', (req, res, next) => {
  Game.findByIdAndUpdate(
    req.body.id,
    { $set: req.body },
    { new: true },
    (err, x) => {
      console.log(x);
      if (err) {
        res.json({ success: false, message: ERROR_MESSAGE, err });
      } else {
        res.json({ success: true, message: SUCCESS });
      }
    }
  );
});

router.delete('/remove/:id', (req, res, next) => {
  Game.findByIdAndDelete(req.params.id, (err, game) => {
    if (err) {
      res.json({ success: false, message: ERROR_MESSAGE, err });
    } else {
      if (!game) res.json({ success: false, message: USER_NOT_FOUND });
      else res.json({ success: true, message: USER_REMOVED });
    }
  });
});

router.get('/all', (req, res, next) => {
  Game.find({}, (err, teams) => {
    if (err) {
      res.json({ success: false, message: ERROR_MESSAGE, err });
    } else if (teams.length === 0) {
      res.json({ success: false, message: USER_NOT_FOUND, teams });
    } else {
      res.json({ success: true, message: SUCCESS, teams });
    }
  });
});

router.get('/:id', (req, res, next) => {
  Game.findById(req.params.id, (err, game) => {
    if (err) {
      res.json({ success: false, message: ERROR_MESSAGE, err });
    } else if (!game) {
      res.json({ success: false, message: USER_NOT_FOUND });
    } else {
      res.json({ success: true, message: SUCCESS, team: game });
    }
  });
});
module.exports = router;
