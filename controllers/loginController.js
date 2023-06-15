const crypto = require('crypto');
const User = require('../models/UserModel');
const transporter = require('../utils/mailer');

// Register
exports.getRegisterPage = (req, res, next) => {
  // If user is already logged in, redirect to dashboard
  if (req.session.user) {
    return res.redirect('/add-info/add-basic');
  }

  res.render('pages/login/register');
};

// Login page
exports.getLoginPage = (req, res, next) => {
  // If user is already logged in, redirect to dashboard
  if (req.session.user) {
    return res.redirect('/add-info/add-basic');
  }

  res.render('pages/login/login');
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
      subject: 'EZ-Resume Login Link',
      html: `<!DOCTYPE html>
<html>
<head>
  <style>
    body {
      font-family: Arial, sans-serif;
      color: #333;
      padding: 20px;
      line-height: 1.6;
    }

    .content {
      font-size: 18px;
      margin-bottom: 20px;
    }
    .link {
      font-size: 18px;
      color: blue;
      text-decoration: none;
    }
    .header 
    {
      margin-bottom: 20px;
    }
      .footer {
      font-size: 16px;
      margin-top: 20px;
    }
  </style>
</head>
<body>
  <div class="header">
    Hello,
  </div>
  
  <div>
    Click 
    <a href="${link}" class="link">
      here
    </a> 
    to login to EZ-Resume. </div>
  <div class="footer">
    Let EZ-Resume make your job application effortless.
  </div>
</body>
</html>
`,
    });

    res.render('pages/login/check-email', { email });
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
    res.redirect('/add-info/add-basic');
  } catch (error) {
    next(error);
  }
};

// Logout, destroy session, redirect to login page
exports.getLogout = (req, res, next) => {
  req.session.destroy((err) => {
    if (err) {
      return next(err);
    }
    res.redirect('/');
  });
};
