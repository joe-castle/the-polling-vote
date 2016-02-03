'use strict';

import bodyParser from 'body-parser';
import express from 'express';

import {addPoll} from '../actions/poll-actions';

const app = express();

export default ({dispatch, getState}) => {
  app.use('/api/', bodyParser.json());
  app.use('/', express.static(`${__dirname}/../public`));
  // app.get('*', (req, res) => res.sendFile(`${__dirname}/../public/index.html`));

  app.route('/api/polls')
    .get((req, res) => {
      res.json(getState())
    })
    .post((req, res) => {
      let {polls} = getState()
        , exists = polls.find(x => x.name === req.body.name);

      if (exists) {
        res.status(409).send('A poll with that name already exists, please try again.');
      } else {
        dispatch(addPoll(req.body));
        res.status(201).json(req.body);
      }
    })
    .put((req, res) => {

    })
    .delete((req, res) => {

    })

  app.post('/login', (req, res) => {

  });

  app.post('/signup', (req, res) => {

  });
  return app;
};
