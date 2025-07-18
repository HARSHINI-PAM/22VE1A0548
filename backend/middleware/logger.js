
const axios = require("axios");
const https = require("https");

const httpsAgent = new https.Agent({ rejectUnauthorized: false });

const LOGGING_API_URL = "https://20.244.56.144/evaluation-service/logs"; 

function Log(stack, level, pkg, message) {
  axios
    .post(
      LOGGING_API_URL,
      {
        stack,
        level,
        package: pkg,
        message,
      },
      { httpsAgent } // <== Allow self-signed certs here
    )
    .then(() => {
      console.log(`[${level.toUpperCase()}] (${pkg}) - ${message}`);
    })
    .catch((err) => {
      console.error("Failed to send log:", err.message);
    });
}

module.exports = Log;
