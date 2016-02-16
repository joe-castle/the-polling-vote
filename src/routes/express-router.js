'use strict';

const router = require('express').Router();

const renderHtmlWithInitialState = require('../template/render-html-with-initialstate');
const mw = require('../middleware');
const passport = require('../strategies/local');

const Users = require('../models/users');
const Polls = require('../models/polls');

router.route('/api/polls')
  .get(Polls.getAll)
  .post(mw.ensureAuthenticated, mw.testDetails, Polls.exists, (req, res) => {
    Users.get(req.user.username)
      .then(userObj => {
        userObj.addPoll(req.poll.name);
        req.poll.saveToDB();
        res.status(201).json(req.poll.format());
      })
  })
  .put(mw.ensureAuthenticated, mw.testDetails, (req, res) => {
    Polls.get(req.body.pollName)
      .then(poll => {
        poll.edit(req.body.newOptions);
        res.json(poll);
      })
  })
  .delete(mw.ensureAuthenticated, mw.testDetails, (req, res) => {
    Users.get(req.user.username).
      then(userObj => {
        userObj.deletePoll(req.body.pollName);
        Polls.del(req.body.pollName);
        res.json(userObj.username);
      })
  });

router.put('/api/polls/vote', (req, res) => {
  Polls.get(req.body.pollName)
    .then(poll => {
      if (poll.hasVoted(req.ip)) {
        res.status(409).send('Sorry, you can only vote on a poll once.');
      } else {
        poll.vote(req.body.option, req.ip);
        res.json(poll);
      }
    })
});

router.get('/api/users', Users.getAll);

router.post('/signup', Users.exists, (req, res) => {
  req.userObj.encryptPassword().saveToDB();
  req.login(req.userObj, (err) => {if (err) {console.log(err)}});
  res.status(201).json(req.userObj.format());
});

router.post('/login', passport.authenticate('local'), (req, res) => {
  res.json(req.user);
});

router.post('/logout', (req, res) => {
  req.logout();
  res.end();
})

router.use('*', renderHtmlWithInitialState);

module.exports = router;
