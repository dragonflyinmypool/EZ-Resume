const Profile = require('../models/Profile');
const User = require('../models/User');

const businessList = ['The best Cafe', 'Shop Till You Drop Superstore'];

exports.dashboard = async (req, res) => {
  // get businesses from database, all businesses on list

  const user = await User.findById(req.session.userId);
  const jobHistory = await Profile.find({ user: user._id });

  res.render('dashboard/home', {
    user: user,
    fullName: `${user.first_name} ${user.last_name}`,
    jobHistory: jobHistory,
  });
};

exports.add_entry = async (req, res) => {
  if (!req.session.userId) {
    console.log('No session ID found');
    return res.redirect('/login');
  }

  const user = await User.findById(req.session.userId);

  const { title, job_history } = req.body;
  const profile = new Profile({ title, job_history, user: user._id });
  await profile.save();

  res.redirect('/dashboard/home');
};
