const User = require('../models/UserModel');
const GPT3_API = require('../utils/gpt');
const prompt = require('../utils/gptPrompt');

// Add info
exports.getAddInfo = async (req, res, next) => {
  try {
    const user = await User.findOne({ email: req.session.user });
    res.render('add-basic', { user });
  } catch (error) {
    next(error);
  }
};
exports.addBasicInfo = async (req, res, next) => {
  try {
    const user = await User.findOne({ email: req.session.user });
    const { firstName, lastName, phone, location } = req.body;

    user.basicInfo = { firstName, lastName, phone, location };
    await user.save();

    res.redirect('/dashboard/add-basic');
  } catch (error) {
    next(error);
  }
};
exports.addEntry = async (req, res, next) => {
  try {
    const user = await User.findOne({ email: req.session.user });

    const { section, description, page } = req.body;
    user[section].push({ description });

    await user.save();
    res.redirect(page);
  } catch (error) {
    next(error);
  }
};
exports.deleteEntry = async (req, res, next) => {
  console.log(req.params);
  try {
    const user = await User.findOne({ email: req.session.user });
    const { section, itemId } = req.params;

    user[section] = user[section].filter(
      (item) => item._id.toString() !== itemId
    );
    await user.save();

    res.redirect(`/dashboard/${page}`);
  } catch (error) {
    next(error);
  }
};

// Add jobs
exports.getAddJobs = async (req, res, next) => {
  try {
    const user = await User.findOne({ email: req.session.user });
    res.render('add-jobs', { user });
  } catch (error) {
    next(error);
  }
};

// Add education
exports.getAddEducation = async (req, res, next) => {
  try {
    const user = await User.findOne({ email: req.session.user });
    res.render('add-education', { user });
  } catch (error) {
    next(error);
  }
};

// Add skills
exports.getAddSkills = async (req, res, next) => {
  try {
    const user = await User.findOne({ email: req.session.user });
    res.render('add-skills', { user });
  } catch (error) {
    next(error);
  }
};

// Create resume
exports.getCreateResume = async (req, res, next) => {
  try {
    const user = await User.findOne({ email: req.session.user });
    const resumeBlank = '';
    res.render('create-resume', { resume: resumeBlank, user });
  } catch (error) {
    next(error);
  }
};
exports.postCreateResume = async (req, res, next) => {
  try {
    const { jobListing } = req.body;
    const user = await User.findOne({ email: req.session.user });
    const { firstName, lastName, phone, location } = user.basicInfo;
    const jobs = user.jobs;
    const skills = user.skills;
    const education = user.education;

    const gpt3Prompt = prompt.generatePrompt(
      jobListing,
      firstName,
      lastName,
      phone,
      location,
      jobs,
      skills,
      education
    );
    const gpt3Response = await GPT3_API(gpt3Prompt);

    res.render('create-resume', { resume: gpt3Response, user });
  } catch (error) {
    next(error);
  }
};
