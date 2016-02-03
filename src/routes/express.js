'use strict';

import bodyParser from 'body-parser';
import express from 'express';

import {
  addPoll,
  editPoll,
  deletePoll} from '../actions/poll-actions';
import {deleteOwnPollID} from '../actions/user-actions';

const app = express();

export default ({dispatch, getState}) => {
  app.use('/api/', bodyParser.json());
  app.use('/', express.static(`${__dirname}/../public`));
  // app.get('*', (req, res) => res.sendFile(`${__dirname}/../public/index.html`));

  app.route('/api/polls')
    .get((req, res) => {
      res.json(getState());
    })
    .post((req, res) => {
      let {polls} = getState()
        , exists = polls.find(x => x.name === req.body.name)
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
      dispatch(editPoll(req.body.id, req.body))
      res.json(req.body);
    })
    .delete((req, res) => {
      let {id, user} = req.body;
      console.log(req.body);
      dispatch(deletePoll(id));
      dispatch(deleteOwnPollID(user, id));
      res.sendStatus(200);
    })

  app.post('api/login', (req, res) => {

  });

  app.post('api/signup', (req, res) => {

  });
  return app;
};
