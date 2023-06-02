const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const { sendToDashboard } = require('../middlewares/checkCookie');

// GET => pages
router.get('/login', sendToDashboard, (req, res) => {
  res.render('login');
});

router.get('/register', sendToDashboard, (req, res) => {
  res.render('register', { message: req.flash('message') });
});

// POST => registration and login
router.post('/register', authController.register);
router.post('/login', authController.login);

// GET => logout
router.get('/logout', authController.logout);

module.exports = router;
