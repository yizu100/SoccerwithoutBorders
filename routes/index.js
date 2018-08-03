const express = require('express');
const router = express.Router();
const User = require('../models/user');

// set layout variables
router.use(function (req, res, next) {
  res.locals.title = "Soccer Without Borders";
  res.locals.currentUserId = req.session.userId;
  next();
});

// home page
router.get('/', (req, res, next) => {
  res.render('index');
});

// login
router.get('/login', (req, res, next) => {
  res.render('login');
});

// POST login
router.post('/login', (req, res, next) => {
  User.authenticate(req.body.username, req.body.password, (err, user) => {
    if (err || !user) {
      const next_error = new Error("Username or password incorrect");
      next_error.status = 401;

      return next(next_error);
    } else {
      req.session.userId = user._id;

      return res.redirect('/');
    }
  });
});

module.exports = router;
