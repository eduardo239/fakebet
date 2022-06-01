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
  const { name, type, emblem, shortName } = req.files;
  const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
  console.log(req.files.emblem);
  console.log(req.files.type);
  console.log(req.files.name);
  console.log(req.files.shortName);
  let fileType = req.files.file.name.split('.')[1];
  let fileName = req.files.emblem.fieldname;
  const path = fileName + '-' + uniqueSuffix + fileType;
  console.log(path);

  const newTeam = {
    name,
    type,
    emblem,
    shortName,
  };

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
