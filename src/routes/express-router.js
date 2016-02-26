'use strict';

const router = require('express').Router();

const renderHtmlWithInitialState = require('../template/render-html-with-initialstate');
const mw = require('../middleware');
const passport = require('../strategies/local');

const Users = require('../models/users');
const Polls = require('../models/polls');

router.route('/api/polls')
  .get(Polls.getAll)
  .post(mw.ensureAuthenticated, mw.testDetails, Polls.create)
  .put(mw.ensureAuthenticated, mw.testDetails, Polls.edit)
  .delete(mw.ensureAuthenticated, mw.testDetails, Polls.delete)

router.put('/api/polls/vote', Polls.vote);

router.get('/api/users', Users.getAll);

router.post('/signup', Users.create);

router.post('/login', passport.authenticate('local'), (req, res) => {
  res.json(req.user);
});

router.post('/logout', (req, res) => {
  req.logout();
  res.end();
})

// router.use('*', renderHtmlWithInitialState);

module.exports = router;
