const express = require('express');
const userDataController = require('../controllers/dashboardController');
const auth = require('../middlewares/auth');

const router = express.Router();
// add auth middleware to all routes
router.use(auth);

// Add Info
router.get('/add-basic', userDataController.getAddInfo);
router.post('/basic-info', userDataController.addBasicInfo);
router.post('/add-info', userDataController.addEntry);
router.delete('/delete-info/:section/:itemId', userDataController.deleteEntry);

// Add jobs
router.get('/add-jobs', userDataController.getAddJobs);

// Add education
router.get('/add-education', userDataController.getAddEducation);

// Add skills
router.get('/add-skills', userDataController.getAddSkills);

// Create Resume
router.get('/create-resume', userDataController.getCreateResume);
router.post('/create-resume', userDataController.postCreateResume);

module.exports = router;
