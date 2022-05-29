const express = require('express');
const router = express.Router();
const bcryptjs = require('bcryptjs');
const passport = require('passport');
const User = require('../models/user');

const ERROR_MESSAGE = 'Algo aconteceu de errado';
const USER_NOT_FOUND = 'Usuário não encontrado';
const USER_REMOVED = 'Usuário removido com sucesso';
const USER_UPDATED = 'Usuário atualizado com sucesso';
const SUCCESS = 'Sucesso';
const ERROR_EMAIL_USER =
  'Email e/ou nome de usuário inválidos ou já cadastrados';

router.post('/sign-up', (req, res, next) => {
  User.findOne({ email: req.body.email }, async (err, user) => {
    if (err) {
      res.json({ success: false, message: ERROR_MESSAGE });
    } else {
      if (!user) {
        const hashedPassword = await bcryptjs.hash(req.body.password, 10);

        const newUser = new User({
          username: req.body.username,
          email: req.body.email,
          password: hashedPassword,
        });

        await newUser.save();
        res.json({ success: true, message: SUCCESS, user: newUser });
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
    if (!user) return res.json({ success: false, message: USER_NOT_FOUND });

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
        if (!user) res.json({ success: false, message: USER_NOT_FOUND });
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

router.get('/', (req, res, next) => {
  res.send(req.user);
});

router.delete('/remove/:id', (req, res, next) => {
  User.findByIdAndDelete(req.params.id, (err, user) => {
    if (err) {
      res.json({ success: false, message: ERROR_MESSAGE });
    } else {
      if (!user) res.json({ success: false, message: USER_NOT_FOUND });
      else res.json({ success: true, message: USER_REMOVED });
    }
  });
});

module.exports = router;
