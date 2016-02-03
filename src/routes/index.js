'use strict';

const bp = require('body-parser');
const express = require('express');
const app = express();

app.use('/', express.static(`${__dirname}/../public`));
app.use('/api/', bp.urlencoded({extended: false}));
// app.get('*', (req, res) => res.sendFile(`${__dirname}/../public/index.html`));

app.route('/api/polls')
  .post((req, res) => {
    res.json(req.body);
  });

app.post('/login', (req, res) => {

});

app.post('/signup', (req, res) => {

});

module.exports = app;
