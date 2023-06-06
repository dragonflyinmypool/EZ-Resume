const express = require('express');
const userDataController = require('../controllers/dashboardController');
const auth = require('../middlewares/auth');

const router = express.Router();
// add auth middleware to all routes
router.use(auth);

// Add Info
router.get('/add-info', userDataController.getAddInfo);
router.post('/add-info', userDataController.addEntry);
router.post('/basic-info', userDataController.addBasicInfo);
router.delete(
  '/delete-info/:section/:itemId',
  auth,
  userDataController.deleteEntry
);

// Create Resume
router.get('/create-resume', userDataController.getCreateResume);
router.post('/create-resume', userDataController.postCreateResume);

module.exports = router;
