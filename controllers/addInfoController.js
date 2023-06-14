const User = require('../models/UserModel');

// ADD BASIC
// Get add basic page
exports.getAddBasicPage = async (req, res, next) => {
  try {
    const user = await User.findOne({ email: req.session.user });
    res.render('add-basic', { user });
  } catch (error) {
    next(error);
  }
};
// Save basic data
exports.postBasic = async (req, res, next) => {
  try {
    const user = await User.findOne({ email: req.session.user });
    const { firstName, lastName, phone, location } = req.body;

    user.basicInfo = { firstName, lastName, phone, location };
    await user.save();

    res.redirect('/dashboard/add-jobs');
  } catch (error) {
    next(error);
  }
};

// ADD JOBS
// Get add jobs page
exports.getAddJobsPage = async (req, res, next) => {
  try {
    const user = await User.findOne({ email: req.session.user });
    res.render('add-jobs', { user });
  } catch (error) {
    next(error);
  }
};
// Save jobs data
exports.postJobs = async (req, res, next) => {
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

// ADD EDUCATION
// Get add education page
exports.getAddEducationPage = async (req, res, next) => {
  try {
    const user = await User.findOne({ email: req.session.user });
    res.render('add-education', { user });
  } catch (error) {
    next(error);
  }
};
// Save education data
exports.postEducation = async (req, res, next) => {
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

// ADD SKILLS
// Get add skills page
exports.getAddSkillsPage = async (req, res, next) => {
  try {
    const user = await User.findOne({ email: req.session.user });
    res.render('add-skills', { user });
  } catch (error) {
    next(error);
  }
};
// Save skills data
exports.postSkills = async (req, res, next) => {
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

// Delete entry
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
