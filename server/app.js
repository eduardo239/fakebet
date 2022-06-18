const createError = require('http-errors');
const mongoose = require('mongoose');
const express = require('express');
const cors = require('cors');
const passport = require('passport');
const session = require('express-session');
// eslint-disable-next-line no-unused-vars
const passportLocal = require('passport-local');
const path = require('path');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const logger = require('morgan');
const fileUpload = require('express-fileupload');

// eslint-disable-next-line no-unused-vars
const User = require('./models/user');
// eslint-disable-next-line no-unused-vars
const Bet = require('./models/bet');
// eslint-disable-next-line no-unused-vars
const Team = require('./models/team');
// eslint-disable-next-line no-unused-vars
const Sport = require('./models/sport');
// eslint-disable-next-line no-unused-vars
const HistoryBalance = require('./models/historyBalance');
// eslint-disable-next-line no-unused-vars
const HistoryBet = require('./models/historyBet');
// - - - - - - ROUTES - - - - - - //
const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const betsRouter = require('./routes/bets');
const teamsRouter = require('./routes/teams');
const gamesRouter = require('./routes/games');
const sportsRouter = require('./routes/sports');
const historyBalanceRouter = require('./routes/historyBalance');
const historyBetRouter = require('./routes/historyBet');

const app = express();
const URL =
  'mongodb+srv://passport:kesg6oYxdXuYSiho@cluster0.89non.mongodb.net/?retryWrites=true&w=majority';
// - - - - - - - - - MONGO - - - - - - - - //
mongoose.connect(URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
// - - - - - - view engine setup - - - - - - //
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
// - - - - - - - MIDDLEWARE - - - - - - - //
app.use(
  fileUpload({
    limits: { fileSize: 50 * 1024 * 1024 },
    useTempFiles: true,
    tempFileDir: 'uploads/',
  })
);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(
  cors({
    origin: 'http://localhost:3000',
    credentials: true,
  })
);
app.use(
  session({
    secret: 'keyboard cat',
    resave: true,
    saveUninitialized: true,
  })
);
app.use(cookieParser('secret'));
app.use(passport.initialize());
app.use(passport.session());
require('./passport/config')(passport);
// - - - - - - - - - DEFAULT MID - - - - - - - - //
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/bets', betsRouter);
app.use('/teams', teamsRouter);
app.use('/games', gamesRouter);
app.use('/sports', sportsRouter);
app.use('/history-balance', historyBalanceRouter);
app.use('/history-bet', historyBetRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
