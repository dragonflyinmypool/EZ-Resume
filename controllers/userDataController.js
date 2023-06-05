const User = require('../models/UserModel');
const GPT3_API = require('../utils/gpt');

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
  const resumeBlank = '';
  // Re-render the page with the generated resume
  res.render('createResume', { resume: resumeBlank });
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

  // Create a prompt for GPT to generate a resume
  const prompt = `# Generate a resume in html and with css style tag for the following job. It should be in pure html with a css style tag. This html will be placed directly in a web page.
  
  
  ========
  job: ${jobListing}
  ========

  Try to stay true to the following information provided by the user. If you think it is necessary, you can add additional information to the resume. Color the new info in green.
 
  ========
  ## Based on the following information provided by the user:  
  ${firstName} ${lastName}
  ## Basic Information
  ${firstName} ${lastName}
  ${phone}
  ${location}
  ## Work Experience
  ${jobs.map((job) => `### ${job.description}`).join('\n')}
  ## Skills
  ${skills.map((skill) => `### ${skill.description}`).join('\n')}
  ## Education
  ${education.map((edu) => `### ${edu.description}`).join('\n')}
  `;

  // Generate the resume
  const gpt3Response = await GPT3_API(prompt);
  console.log(gpt3Response);
  // var result = md.render(gpt3Response);
  // Re-render the page with the generated resume
  res.render('createResume', { resume: gpt3Response });
};
