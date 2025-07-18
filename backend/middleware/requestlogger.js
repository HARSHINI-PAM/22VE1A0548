const Log = require('../middleware/logger');

function requestLogger(req, res, next) {
  Log("backend", "info", "router", `Incoming request: ${req.method} ${req.url}`);
  next();
}

module.exports = requestLogger;

const requestLogger = require('./middleware/requestLogger');
app.use(requestLogger);
