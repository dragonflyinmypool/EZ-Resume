const express = require('express');
const addInfoController = require('../controllers/addInfoController');
const auth = require('../middlewares/auth');

const router = express.Router();
// add auth middleware to all routes
router.use(auth);

// Add basic page
router.get('/add-basic', addInfoController.getAddBasicPage);
router.post('/add-basic', addInfoController.postBasic);

// Add jobs
router.get('/add-jobs', addInfoController.getAddJobsPage);
router.post('/add-jobs', addInfoController.postJobs);

// Add education
router.get('/add-education', addInfoController.getAddEducationPage);
router.post('/add-jobs', addInfoController.postEducation);

// Add skills
router.get('/add-skills', addInfoController.getAddSkillsPage);
router.post('/add-jobs', addInfoController.postSkills);

// Delete info
router.delete('/delete-info/:section/:itemId', addInfoController.deleteEntry);

module.exports = router;
