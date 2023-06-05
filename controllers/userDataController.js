const User = require('../models/UserModel');
const GPT3_API = require('../utils/gpt');
const prompt = require('../utils/prompt');

var md = require('markdown-it')();

exports.getDashboard = async (req, res) => {
  if (!req.session.user) {
    console.log('No user found');

    return res.redirect('/');
  }

  const user = await User.findOne({ email: req.session.user });

  res.render('dashboard', { user });
};

exports.addEntry = async (req, res) => {
  if (!req.session.user) {
    console.log('No user found');
    return res.redirect('/');
  }

  // Use `findOne` to get the user by email
  const user = await User.findOne({ email: req.session.user });

  const { section, description } = req.body;

  // Push the new entry to the appropriate section
  user[section].push({ description });

  // Save the user
  await user.save();

  res.redirect('/dashboard');
};

exports.deleteEntry = async (req, res) => {
  if (!req.session.user) {
    console.log('No user found');
    return res.redirect('/');
  }

  // Use `findOne` to get the user by email
  const user = await User.findOne({ email: req.session.user });

  const { section, itemId } = req.params;

  // Find the item in the appropriate section and remove it
  user[section] = user[section].filter(
    (item) => item._id.toString() !== itemId
  );

  // Save the user
  await user.save();

  res.redirect('/dashboard');
};

exports.updateBasicInfo = async (req, res) => {
  if (!req.session.user) {
    console.log('No user found');
    return res.redirect('/');
  }

  // Use `findOne` to get the user by email
  const user = await User.findOne({ email: req.session.user });

  const { firstName, lastName, phone, location } = req.body;

  // Update the user's basic information
  user.basicInfo = { firstName, lastName, phone, location };

  // Save the user
  await user.save();

  res.redirect('/dashboard');
};

exports.getCreateResume = async (req, res) => {
  if (!req.session.user) {
    console.log('No user found');
    return res.redirect('/');
  }

  const user = await User.findOne({ email: req.session.user });

  const resumeBlank = '';
  // Re-render the page with the generated resume
  res.render('createResume', { resume: resumeBlank, user });
};

exports.postCreateResume = async (req, res) => {
  // Get job listing
  const { jobListing } = req.body;
  // Get the user by email
  const user = await User.findOne({ email: req.session.user });
  // Get the user's basic information
  const { firstName, lastName, phone, location } = user.basicInfo;
  // Get the user's jobs
  const jobs = user.jobs;
  // Get the user's skills
  const skills = user.skills;
  // Get the user's education
  const education = user.education;

  // Generate the resume
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

  console.log(gpt3Response);
  // var result = md.render(gpt3Response);
  // Re-render the page with the generated resume
  res.render('createResume', { resume: gpt3Response });
};
