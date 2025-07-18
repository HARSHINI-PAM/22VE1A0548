const express = require('express');
const router = express.Router();
const {
    createShortUrl,
    redirectUrl,
    getStatistics
} = require('../controllers/urlController');

router.post('/shorten', createShortUrl);

router.get('/:code', redirectUrl);

router.get('/stats/:code', getStatistics);

module.exports = router;
