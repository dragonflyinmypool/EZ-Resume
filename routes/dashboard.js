const express = require('express');
const userDataController = require('../controllers/dashboardController');
const auth = require('../middlewares/auth');

const router = express.Router();

router.get('/add-info', auth, userDataController.getDashboard);
router.post('/add-info', auth, userDataController.addEntry);
router.post('/basic-info', auth, userDataController.updateBasicInfo);
router.delete(
  '/delete-info/:section/:itemId',
  auth,
  userDataController.deleteEntry
);
router.get('/create-resume', auth, userDataController.getCreateResume);
router.post('/create-resume', auth, userDataController.postCreateResume);

module.exports = router;
