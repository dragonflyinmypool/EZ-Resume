const User = require('../models/UserModel');
const GPT3_API = require('../utils/gpt');
const prompt = require('../utils/gptPrompt');
const { createResumeString } = require('../utils/createResumeString');
const puppeteer = require('puppeteer');
const path = require('path');
const uuidv4 = require('uuid').v4;

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
    const resume = '';
    const pdfUrl = '';
    res.render('create-resume', { resume, user, pdfUrl });
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

    const resumeDataString = await GPT3_API(gpt3Prompt);

    // Convert string to object
    const resume = JSON.parse(resumeDataString);

    // Convert object to string
    const resumeString2 = createResumeString(resume);

    // Use puppeteer to convert string to PDF
    const browser = await puppeteer.launch({ headless: 'new' });
    const page = await browser.newPage();

    await page.setContent(resumeString2, {
      waitUntil: 'networkidle0',
    });

    const pdfConfig = {
      format: 'A4',
      printBackground: true,
    };

    // Generate a unique filename
    const filename = `resume_${uuidv4()}.pdf`;

    // Define the path of PDF file
    const pdfPath = path.join(__dirname, '../public/pdfs', filename);

    await page.pdf({ ...pdfConfig, path: pdfPath });
    await browser.close();

    // email the PDF to the user

    // Get just the filename
    const urlFileName = path.basename(pdfPath);

    // Form the URL
    const pdfUrl = `/pdfs/${urlFileName}`;

    // Render the HTML page and provide a download link for the PDF
    res.render('create-resume', { resume, user, pdfUrl });
  } catch (error) {
    next(error);
  }
};
