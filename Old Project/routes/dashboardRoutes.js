const express = require('express');
const router = express.Router();
const dashboardController = require('../controllers/dashboardController');
// import middleware
const { sendToLogin } = require('../middlewares/checkCookie');

router.get('/home', sendToLogin, dashboardController.dashboard);

router.post('/add_entry', dashboardController.add_entry);

module.exports = router;
