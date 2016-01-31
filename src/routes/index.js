'use strict';

const express = require('express');
const app = express();

app.use('/', express.static(`${__dirname}/../public`));
// app.get('*', (req, res) => res.sendFile(`${__dirname}/../public/index.html`));

app.post('/login', (req, res) => {

});

app.post('/signup', (req, res) => {

});

module.exports = app;
