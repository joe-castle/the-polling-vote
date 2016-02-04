'use strict';

import bodyParser from 'body-parser';
import express from 'express';

import {
  addPoll,
  editPoll,
  voteOnPoll,
  deletePoll} from '../actions/poll-actions';
import {deleteOwnPollID} from '../actions/user-actions';

const app = express();

export default ({dispatch, getState}) => {
  app.use(express.static(`${__dirname}/../public`));
  app.use(bodyParser.json());
  // app.get('*', (req, res) => res.sendFile(`${__dirname}/../public/index.html`));

  app.route('/api/polls')
    .get((req, res) => {
      res.json(getState());
    })
    .post((req, res) => {
      let {polls} = getState()
        , exists = polls.find(x => x.name.toLowerCase() === req.body.name.toLowerCase())
        , id = polls.length > 0 ? polls[polls.length-1].id + 1 : 1
        , responseBody = {
          id,
          ...req.body
        };

      if (exists) {
        res.status(409).send('A poll with that name already exists, please try again.');
      } else {
        dispatch(addPoll(responseBody));
        res.status(201).json(responseBody);
      }
    })
    .put((req, res) => {
      let {type, pollID, payload, option} = req.body
      if (type === 'edit') {
        dispatch(editPoll(payload.id, payload))
      } else if (type === 'vote') {
        dispatch(voteOnPoll(pollID, option));
      }
      res.json(req.body);
    })
    .delete((req, res) => {
      let {pollID, user} = req.body;
      dispatch(deletePoll(pollID));
      dispatch(deleteOwnPollID(user, pollID));
      res.json(req.body);
    })

  app.post('/login', (req, res) => {

  });

  app.post('/signup', (req, res) => {

  });
  return app;
};
