const express = require('express');
const userController = require('../controllers/userController');
const userDataController = require('../controllers/userDataController');

const router = express.Router();

router.get('/', userController.getLoginPage);
router.post('/', userController.postLogin);
router.get('/login/:token', userController.getToken);
router.get('/logout', userController.logout);

router.get('/dashboard', userDataController.getDashboard);
router.post('/dashboard', userDataController.add_entry);

module.exports = router;
