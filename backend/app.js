const express = require('express');
const app = express();
const urlRoutes = require('./routes/urlRoutes');

app.use(express.json());
app.use('/', urlRoutes);

module.exports = app;
