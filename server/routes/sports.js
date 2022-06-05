const express = require('express');
const router = express.Router();
const Sport = require('../models/sport');

const { ERROR_MESSAGE, SUCCESS } = require('../utils/constants');

router.post('/add', (req, res, next) => {
  const newSport = new Sport({
    name: req.body.name,
  });

  newSport.save((err, team) => {
    if (err) {
      res.json({ success: false, message: ERROR_MESSAGE, err });
    } else {
      res.json({ success: true, message: SUCCESS, team });
    }
  });
});

// router.put('/edit', (req, res, next) => {
//   Team.findByIdAndUpdate(
//     req.body._id,
//     { $set: req.body },
//     { new: true },
//     (err) => {
//       if (err) {
//         res.json({ success: false, message: ERROR_MESSAGE, err });
//       } else {
//         res.json({ success: true, message: SUCCESS });
//       }
//     }
//   );
// });

router.delete('/remove/:id', (req, res, next) => {
  Sport.findByIdAndDelete(req.params.id, (err, team) => {
    if (err) {
      res.json({ success: false, message: ERROR_MESSAGE, err });
    } else {
      if (!team) res.json({ success: false, message: `SPORT NAO ENCONTRADO` });
      else res.json({ success: true, message: 'SPORT REMOVIDO' });
    }
  });
});

router.get('/all', (req, res, next) => {
  Sport.find({}, (err, sports) => {
    if (err) {
      res.json({ success: false, message: ERROR_MESSAGE, err });
    } else if (sports.length === 0) {
      res.json({ success: false, message: 'SPORTS NOT FOUND' });
    } else {
      res.json({ success: true, message: SUCCESS, sports: sports });
    }
  });
});

// router.get('/:id', (req, res, next) => {
//   Team.findById(req.params.id, (err, team) => {
//     if (err) {
//       res.json({ success: false, message: ERROR_MESSAGE, err });
//     } else if (!team) {
//       res.json({ success: false, message: USER_NOT_FOUND });
//     } else {
//       res.json({ success: true, message: SUCCESS, team: team });
//     }
//   });
// });
module.exports = router;
