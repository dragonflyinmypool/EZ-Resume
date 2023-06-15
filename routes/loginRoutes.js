const express = require('express');
const loginController = require('../controllers/loginController');

const router = express.Router();

router.get('/', loginController.getRegisterPage);

router.get('/login', loginController.getLoginPage);

router.post('/', loginController.postLogin);
router.get('/login/:token', loginController.getToken);
router.get('/logout', loginController.getLogout);

module.exports = router;
