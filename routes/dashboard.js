const express = require('express');
const userDataController = require('../controllers/userDataController');
const auth = require('../middlewares/auth');

const router = express.Router();

router.get('/dashboard', auth, userDataController.getDashboard);
router.post('/dashboard', auth, userDataController.addEntry);
router.post('/dashboard/basicInfo', auth, userDataController.updateBasicInfo);

router.post(
  '/dashboard/:section/:itemId',
  auth,
  userDataController.deleteEntry
);

router.get('/create-resume', auth, userDataController.getCreateResume);
router.post('/create-resume', auth, userDataController.postCreateResume);

module.exports = router;
