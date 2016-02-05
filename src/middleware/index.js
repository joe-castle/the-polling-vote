const bcrypt = require('bcrypt');

module.exports = {
  ensureAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
      return next();
    } else {
      res.status(401).send('This actions requires authentication, please login and try again');
    }
  },
  encryptPassword(req, res, next) {
    bcrypt.hash(req.body.password, 10, (err, hash) => {
      if (err) { throw err; }
      req.body.password = hash;
      next()
    })
  },

}
