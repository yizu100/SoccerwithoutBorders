const express = require('express');
const router = express.Router();
const User = require('../models/user');

// Users index
router.get('/', (req, res, next) => {
  User.find({}, 'username', (err, users) => {
    if(err) {
      console.error(err);
    } else {
      res.render('index', { users: users });
    }
  });
});

// Users new
router.get('/new', (req, res, next) => {
  res.render('new');
})

// Users create
router.post('/', (req, res, next) => {
  const user = new User(req.body);

  user.save((err, user) => {
    if(err) console.log(err);
    return res.redirect('/users');
  });
});

module.exports = router;
