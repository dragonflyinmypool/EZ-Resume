const express = require('express');
const userController = require('../controllers/loginController');

const router = express.Router();

router.get('/', userController.getLoginPage);
router.post('/', userController.postLogin);
router.get('/login/:token', userController.getToken);
router.get('/logout', userController.logout);

module.exports = router;
