const express = require('express');
const logger = require('./middleware/logger');
const app = express();

const urlRoutes = require('./routes/urlRoutes');
app.use(logger);
app.use(express.json());
app.use('/', urlRoutes);

module.exports = app;
