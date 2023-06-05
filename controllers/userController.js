const crypto = require('crypto');
const User = require('../models/UserModel');
const transporter = require('../utils/mailer');

// Login page
exports.getLoginPage = (req, res) => {
  // If user is already logged in, redirect to dashboard
  if (req.session.user) {
    return res.redirect('/dashboard');
  }

  res.render('index');
};

// User submits email =>
// This funciton generates 'token' and sends in email as part of link.
exports.postLogin = async (req, res) => {
  // Gets email from form
  const email = req.body.email;

  // Checks if user exists in database
  let user = await User.findOne({ email });

  // Creates a token
  const token = crypto.randomBytes(64).toString('hex');

  // Checks for user in database. If no user, creates new user and adds token. If user, updates token.
  if (!user) {
    user = new User({ email, token });
  } else {
    user.token = token;
  }

  // Sets the an expiration date for the token and saves the user to the database.
  user.expires = new Date(Date.now() + 60 * 60 * 1000); // 1 hour from now

  // Saves user / updates user in database
  await user.save();

  // Generates a link with the token as part of the URL
  const link = `http://${req.headers.host}/login/${token}`;

  // Sends the email
  await transporter.sendMail({
    from: process.env.EMAIL_USER,
    to: email,
    subject: 'Login link',
    html: `Click <a href="${link}">here</a> to login.`,
  });

  res.send('Email sent. Please check your inbox for the login link.');
};

// User clicks the login link which has token as part of it =>
// This function receives the token and uses it to login the user creating a session.
exports.getToken = async (req, res) => {
  //  Takes token from URL and checks if the user exists in the database.
  const user = await User.findOne({
    token: req.params.token,
    expires: { $gt: Date.now() },
  });

  //   If no user sends error message
  if (!user) {
    return res.send('Invalid or expired token');
  }

  //   User has been found, session is set by user email. User sent to dashboard.
  req.session.user = user.email;
  res.redirect('/dashboard');
};

exports.logout = (req, res) => {
  req.session.destroy();
  res.redirect('/');
};
