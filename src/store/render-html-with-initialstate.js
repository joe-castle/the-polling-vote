'use strict';

const template = require('./template.js');

module.exports = (req, res) => {
  res.render(template(initialState));
}
