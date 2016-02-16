module.exports = {
  ensureAuthenticated(req, res, next) {
    if (req.isAuthenticated() || process.env.NODE_ENV === 'test') {
      return next();
    } else {
      res.status(401).send('This actions requires authentication, please login and try again');
    }
  },
  testDetails(req, res, next) {
    if (process.env.NODE_ENV === 'test') {
      req.user = {
        username: 'unchained',
        name: 'django'
      }
    }
    next();
  }
}
