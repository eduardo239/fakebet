const express = require('express');
const router = express.Router();
const Team = require('../models/team');
const {
  ERROR_MESSAGE,
  SUCCESS,
  USER_NOT_FOUND,
  USER_REMOVED,
} = require('../utils/constants');

router.post('/add', (req, res, next) => {
  const newTeam = new Team({
    name: req.body.name,
    type: req.body.type,
    emblem: req.body.emblem,
    shortName: req.body.shortName,
  });

  newTeam.save((err) => {
    if (err) {
      res.json({ success: false, message: ERROR_MESSAGE, err });
    } else {
      res.json({ success: true, message: SUCCESS, team: newTeam });
    }
  });
});

router.put('/edit', (req, res, next) => {
  Team.findByIdAndUpdate(
    req.body.id,
    { $set: req.body },
    { new: true },
    (err) => {
      if (err) {
        res.json({ success: false, message: ERROR_MESSAGE, err });
      } else {
        res.json({ success: true, message: SUCCESS });
      }
    }
  );
});

router.delete('/remove/:id', (req, res, next) => {
  Team.findByIdAndDelete(req.params.id, (err, team) => {
    if (err) {
      res.json({ success: false, message: ERROR_MESSAGE, err });
    } else {
      if (!team) res.json({ success: false, message: USER_NOT_FOUND });
      else res.json({ success: true, message: USER_REMOVED });
    }
  });
});

router.get('/all', (req, res, next) => {
  Team.find({}, (err, teams) => {
    if (err) {
      res.json({ success: false, message: ERROR_MESSAGE, err });
    } else if (teams.length === 0) {
      res.json({ success: false, message: USER_NOT_FOUND });
    } else {
      res.json({ success: true, message: SUCCESS, teams });
    }
  });
});

router.get('/:id', (req, res, next) => {
  Team.findById(req.params.id, (err, team) => {
    if (err) {
      res.json({ success: false, message: ERROR_MESSAGE, err });
    } else if (!team) {
      res.json({ success: false, message: USER_NOT_FOUND });
    } else {
      res.json({ success: true, message: SUCCESS, team: team });
    }
  });
});
module.exports = router;
