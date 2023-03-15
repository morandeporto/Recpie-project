const express = require('express');
const checkAuth = require('../middlewares/checkAuth.js');
const router = express.Router();
const { check } = require('express-validator');

const { singup, login, auth } = require('../controllers/users');

router.post(
  '/singup',
  check('name', 'Name is requred').notEmpty(),
  check('email', 'Please include a vaild email').isEmail(),
  check('password', 'Enter a password with 6 or more characters').isLength({
    min: 6,
  }),
  singup
);
router.post(
  '/login',
  check('email', 'Please include a valid email').isEmail(),
  check('password', 'Password is required').exists(),
  login
);
router.get('/auth', checkAuth, auth);

module.exports = router;
