const User = require('../models/User');
const bcrypt = require('bcrypt');

exports.register = async (req, res) => {
  console.log('Registration attempted');
  const { first_name, last_name, email, password } = req.body;

  try {
    // Check if email already exists
    if (await User.exists({ email })) {
      req.flash('message', 'Email already in use');
      return res.redirect('/register');
    }

    const user = new User({ first_name, last_name, email, password });
    await user.save();
    req.session.userId = user._id;
    res.redirect('/dashboard/home');
  } catch (err) {
    console.log(err);
    res.redirect('/register');
  }
};

exports.login = async (req, res) => {
  console.log('Login attempted');
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      req.flash('message', 'Invalid email or password');
      return res.redirect('/login');
    }

    const validPassword = await bcrypt.compare(password, user.password);

    if (!validPassword) {
      req.flash('message', 'Invalid email or password');
      return res.redirect('/login');
    }

    req.session.userId = user._id;
    res.redirect('/dashboard/home');
  } catch (err) {
    console.log(err);
    res.redirect('/login');
  }
};

exports.logout = (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.redirect('/dashboard/home');
    }
    res.clearCookie('connect.sid');
    res.redirect('/login');
  });
};
