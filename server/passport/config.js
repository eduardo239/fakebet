const User = require('../models/user');
const bcryptjs = require('bcryptjs');
const {
  INCORRECT_USERNAME,
  INCORRECT_PASSWORD,
} = require('../utils/constants');
const localStratey = require('passport-local').Strategy;

module.exports = function (passport) {
  passport.use(
    new localStratey((username, password, done) => {
      User.findOne({ username: username }, (err, user) => {
        if (err) throw err;
        if (!user) return done(null, false, { message: INCORRECT_USERNAME });
        if (!password)
          return done(null, false, { message: INCORRECT_PASSWORD });
        bcryptjs.compare(password, user.password, (err, isMatch) => {
          if (err) throw err;
          if (isMatch) return done(null, user);
          return done(null, false, { message: INCORRECT_PASSWORD });
        });
      });
    })
  );

  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser((id, done) => {
    User.findById(id, (err, user) => {
      done(err, user);
    });
  });
};
