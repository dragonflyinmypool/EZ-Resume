const express = require('express');
const userDataController = require('../controllers/dashboardController');
const auth = require('../middlewares/auth');

const router = express.Router();

// Add Info
router.get('/add-info', auth, userDataController.getAddInfo);
router.post('/add-info', auth, userDataController.addEntry);
router.post('/basic-info', auth, userDataController.addBasicInfo);
router.delete(
  '/delete-info/:section/:itemId',
  auth,
  userDataController.deleteEntry
);

// Create Resume
router.get('/create-resume', auth, userDataController.getCreateResume);
router.post('/create-resume', auth, userDataController.postCreateResume);

module.exports = router;
