module.exports = function (req, res, next) {
  if (!req.session.user) {
    console.log('No user found');
    return res.redirect('/');
  }
  next();
};
