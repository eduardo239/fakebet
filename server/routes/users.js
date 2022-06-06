const express = require('express');
const router = express.Router();
const bcryptjs = require('bcryptjs');
const passport = require('passport');
const User = require('../models/user');
const {
  ERROR_MESSAGE,
  ERROR_EMAIL_USER,
  SUCCESS,
  USER_NOT_FOUND,
  USER_UPDATED,
  USER_REMOVED,
} = require('../utils/constants');

router.post('/sign-up', (req, res, next) => {
  User.findOne({ email: req.body.email }, async (err, user) => {
    if (err) {
      res.json({ success: false, message: ERROR_MESSAGE, err });
    } else {
      if (!user) {
        User.findOne({ username: req.body.username }, async (err, user) => {
          if (err) {
            res.json({ success: false, message: ERROR_MESSAGE, err });
          } else {
            if (!user) {
              const newUser = new User({
                username: req.body.username,
                email: req.body.email,
                password: req.body.password,
              });

              bcryptjs.genSalt(10, (err, salt) => {
                bcryptjs.hash(newUser.password, salt, async (err, hash) => {
                  if (err) {
                    res.json({ success: false, message: ERROR_MESSAGE, err });
                  } else {
                    newUser.password = hash;
                    await newUser.save();
                    res.json({ success: true, message: SUCCESS });
                  }
                });
              });
            } else {
              res.json({ success: false, message: ERROR_EMAIL_USER });
            }
          }
        });
      } else {
        res.json({
          success: false,
          message: ERROR_EMAIL_USER,
        });
      }
    }
  });
});

router.post('/sign-in', (req, res, next) => {
  passport.authenticate('local', (err, user, info) => {
    if (err) return next(err);
    if (!user)
      return res.json({ success: false, message: USER_NOT_FOUND, err });

    req.logIn(user, (err) => {
      if (err) return next(err);
      return res.json({ success: true, message: SUCCESS, user });
    });
  })(req, res, next);
});

router.put('/edit', async (req, res, next) => {
  if (req.body.password) {
    const hashedPassword = await bcryptjs.hash(req.body.password, 10);
    req.body.password = hashedPassword;
  }

  User.findByIdAndUpdate(
    req.body.id,
    { $set: req.body },
    { new: true },
    (err, user) => {
      if (err) {
        res.json({ success: false, message: ERROR_MESSAGE });
      } else {
        if (!user) res.json({ success: false, message: USER_NOT_FOUND, err });
        else res.json({ success: true, message: USER_UPDATED, user });
      }
    }
  );
});

// TODO: add to thunder client
router.put('/balance', async (req, res, next) => {
  User.findByIdAndUpdate(
    req.body.id,
    { $inc: { 'balance.amount': req.body.balance.amount } },
    { new: true },
    (err, user) => {
      if (err) {
        res.json({ success: false, message: ERROR_MESSAGE });
      } else {
        if (!user) res.json({ success: false, message: USER_NOT_FOUND, err });
        else res.json({ success: true, message: USER_UPDATED, user });
      }
    }
  );
});

router.post('/logout', (req, res, next) => {
  req.logout(req.user, (err) => {
    if (err) return next(err);
    else res.json({ success: true, message: SUCCESS });
  });
});

router.get('/info', (req, res, next) => {
  if (req.user) {
    res.json({ success: true, message: SUCCESS, user: req.user });
  } else {
    res.json({ success: false, message: ERROR_MESSAGE });
  }
});

router.delete('/remove/:id', (req, res, next) => {
  User.findByIdAndDelete(req.params.id, (err, user) => {
    if (err) {
      res.json({ success: false, message: ERROR_MESSAGE, err });
    } else {
      if (!user) res.json({ success: false, message: USER_NOT_FOUND });
      else res.json({ success: true, message: USER_REMOVED });
    }
  });
});

router.get('/all', (req, res, next) => {
  User.find({}, (err, users) => {
    if (err) {
      res.json({ success: false, message: ERROR_MESSAGE, err });
    } else if (users.length === 0) {
      res.json({ success: false, message: USER_NOT_FOUND });
    } else {
      res.json({ success: true, message: SUCCESS, users });
    }
  });
});

router.get('/:id', (req, res, next) => {
  User.findById(req.params.id, (err, user) => {
    if (err) {
      res.json({ success: false, message: ERROR_MESSAGE, err });
    } else if (!user) {
      res.json({ success: false, message: USER_NOT_FOUND });
    } else {
      res.json({ success: true, message: SUCCESS, user });
    }
  });
});
module.exports = router;
