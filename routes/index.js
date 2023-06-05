const express = require('express');
const userController = require('../controllers/userController');
const userDataController = require('../controllers/userDataController');

const router = express.Router();

router.get('/', userController.getLoginPage);
router.post('/', userController.postLogin);
router.get('/login/:token', userController.getToken);
router.get('/logout', userController.logout);

router.get('/dashboard', userDataController.getDashboard);
router.post('/dashboard', userDataController.addEntry);
router.post('/dashboard/basicInfo', userDataController.updateBasicInfo);

router.post('/dashboard/:section/:itemId', userDataController.deleteEntry);

router.get('/create-resume', userDataController.getCreateResume);
router.post('/create-resume', userDataController.postCreateResume);

module.exports = router;
