const User = require('../models/UserModel');
const GPT3_API = require('../utils/gpt');
const prompt = require('../utils/prompt');

var md = require('markdown-it')();

exports.getDashboard = async (req, res, next) => {
  try {
    const user = await User.findOne({ email: req.session.user });
    res.render('add-info', { user });
  } catch (error) {
    next(error);
  }
};

exports.addEntry = async (req, res, next) => {
  try {
    const user = await User.findOne({ email: req.session.user });

    const { section, description } = req.body;
    user[section].push({ description });

    await user.save();
    res.redirect('add-info');
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

    res.redirect('/dashboard/add-info');
  } catch (error) {
    next(error);
  }
};

exports.updateBasicInfo = async (req, res, next) => {
  try {
    const user = await User.findOne({ email: req.session.user });
    const { firstName, lastName, phone, location } = req.body;

    user.basicInfo = { firstName, lastName, phone, location };
    await user.save();

    res.redirect('/dashboard/add-info');
  } catch (error) {
    next(error);
  }
};

exports.getCreateResume = async (req, res, next) => {
  try {
    const user = await User.findOne({ email: req.session.user });
    const resumeBlank = '';
    res.render('createResume', { resume: resumeBlank, user });
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

    res.render('createResume', { resume: gpt3Response, user });
  } catch (error) {
    next(error);
  }
};
