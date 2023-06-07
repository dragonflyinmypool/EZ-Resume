const crypto = require('crypto');
const User = require('../models/UserModel');
const transporter = require('../utils/mailer');

// Login page
exports.getLoginPage = (req, res, next) => {
  // If user is already logged in, redirect to dashboard
  if (req.session.user) {
    return res.redirect('/dashboard/add-info');
  }

  res.render('Login');
};

// Register
exports.getRegisterPage = (req, res, next) => {
  // If user is already logged in, redirect to dashboard
  if (req.session.user) {
    return res.redirect('/dashboard/add-info');
  }

  res.render('Register');
};

// User creation and login flow
// 1. Email submitted, user created, email sent
exports.postLogin = async (req, res, next) => {
  try {
    const email = req.body.email;
    let user = await User.findOne({ email });

    const token = crypto.randomBytes(64).toString('hex');

    // Create a new user if none exists, otherwise update token
    if (!user) {
      user = new User({ email, token });
    } else {
      user.token = token;
    }

    user.expires = new Date(Date.now() + 60 * 60 * 1000); // 1 hour from now
    await user.save();

    const link = `http://${req.headers.host}/login/${token}`;

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'Login link',
      html: `Click <a href="${link}">here</a> to login.`,
    });

    res.send('Email sent. Please check your inbox for the login link.');
  } catch (error) {
    next(error);
  }
};
// 2. User clicks the login link, token is verified, user is logged in
exports.getToken = async (req, res, next) => {
  try {
    const user = await User.findOne({
      token: req.params.token,
      expires: { $gt: Date.now() },
    });

    if (!user) {
      return res.status(400).send('Invalid or expired token');
    }

    req.session.user = user.email;
    res.redirect('/dashboard/add-info');
  } catch (error) {
    next(error);
  }
};

// Logout, destroy session, redirect to login page
exports.logout = (req, res, next) => {
  req.session.destroy((err) => {
    if (err) {
      return next(err);
    }
    res.redirect('/');
  });
};
