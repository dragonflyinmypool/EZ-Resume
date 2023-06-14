const express = require('express');
const userController = require('../controllers/loginController');

const router = express.Router();

router.get('/', userController.getRegisterPage);

router.get('/login', userController.getLoginPage);

router.post('/', userController.postLogin);
router.get('/login/:token', userController.getToken);
router.get('/logout', userController.getLogout);

module.exports = router;
