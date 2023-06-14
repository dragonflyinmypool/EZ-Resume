const express = require('express');
const createResumeController = require('../controllers/createResumeController');
const auth = require('../middlewares/auth');

const router = express.Router();
// add auth middleware to all routes
router.use(auth);

// Create Resume
router.get('/create-resume', createResumeController.getCreateResumePage);
router.post('/create-resume', createResumeController.postResume);

module.exports = router;
