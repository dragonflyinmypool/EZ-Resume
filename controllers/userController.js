const crypto = require('crypto');
const User = require('../models/UserModel');
const transporter = require('../utils/mailer');

// Login page
exports.getLoginPage = (req, res, next) => {
  // If user is already logged in, redirect to dashboard
  if (req.session.user) {
    return res.redirect('/dashboard');
  }

  res.render('index');
};

// User submits email
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

// User clicks the login link
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
    res.redirect('/dashboard');
  } catch (error) {
    next(error);
  }
};

exports.logout = (req, res, next) => {
  req.session.destroy((err) => {
    if (err) {
      return next(err);
    }
    res.redirect('/');
  });
};
