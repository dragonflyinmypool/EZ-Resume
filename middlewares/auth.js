module.exports = function (req, res, next) {
  console.log('Checking for user');
  if (!req.session.user) {
    console.log('No user found');
    return res.redirect('/');
  }
  next();
};
