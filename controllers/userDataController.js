const User = require('../models/UserModel');

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
