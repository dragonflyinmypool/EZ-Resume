const User = require('../models/UserModel');

exports.getDashboard = async (req, res) => {
  if (!req.session.user) {
    console.log('No user found');

    return res.redirect('/');
  }

  const user = await User.findOne({ email: req.session.user });

  res.render('dashboard', { user });
};

exports.add_entry = async (req, res) => {
  if (!req.session.user) {
    console.log('No user found');
    return res.redirect('/');
  }

  // Use `findOne` to get the user by email
  const user = await User.findOne({ email: req.session.user });

  const { jobDescription } = req.body;

  // Push the job object with description
  user.jobs.push({ description: jobDescription });

  // Save the user, not the profile
  await user.save();

  res.redirect('/dashboard');
};
