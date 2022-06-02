const express = require('express');
const router = express.Router();
const Team = require('../models/team');

const {
  ERROR_MESSAGE,
  SUCCESS,
  USER_NOT_FOUND,
  USER_REMOVED,
} = require('../utils/constants');

router.post('/upload/:id', (req, res) => {
  const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);

  let { emblem } = req.files;
  let fileType = emblem.name.split('.')[1];
  let fileName = emblem.name.split('.')[0];
  const path = fileName.toUpperCase() + '-' + uniqueSuffix + '.' + fileType;

  req.files.emblem.mv(`./public/images/emblems/${path}`, (err) => {
    if (err) {
      return res.status(500).send(err);
    }
  });

  Team.findByIdAndUpdate(
    req.params.id,
    { $set: { emblem: path } },
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

router.post('/add', (req, res, next) => {
  const newTeam = new Team({
    name: req.body.name,
    shortName: req.body.shortName,
    type: req.body.type,
  });

  newTeam.save((err, team) => {
    if (err) {
      res.json({ success: false, message: ERROR_MESSAGE, err });
    } else {
      res.json({ success: true, message: SUCCESS, team });
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
