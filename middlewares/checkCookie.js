// If cookie is found, redirect to dashboard

exports.sendToDashboard = (req, res, next) => {
  if (req.session.userId) {
    console.log('Cookie found, sending to dashboard page');
    return res.redirect('/dashboard/home');
  }
  next();
};

// Checking if user has a cookie, if no cookie redirect to login
exports.sendToLogin = (req, res, next) => {
  if (!req.session.userId) {
    console.log('No cookie found, sending to login page');
    return res.redirect('/login');
  }
  next();
};
