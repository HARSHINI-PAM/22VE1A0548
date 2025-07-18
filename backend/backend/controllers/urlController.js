const Url = require('../models/Url');
const shortid = require('shortid');
const { BASE_URL } = process.env;

const createShortUrl = async (req, res) => {
    try {
        const { url, validity, shortCode } = req.body;

        if (!url || typeof url !== 'string') {
            return res.status(400).json({ error: 'Invalid or missing "url"' });
        }

        const customCode = shortCode || shortid.generate();
        const existing = await Url.findOne({ shortCode: customCode });

        if (existing) return res.status(400).json({ error: 'Short code already exists' });

        const validMins = validity ? parseInt(validity) : 30;
        const now = new Date();
        const expiryDate = new Date(now.getTime() + validMins * 60000);

        const newUrl = new Url({
            originalUrl: url,
            shortCode: customCode,
            expiryDate
        });

        await newUrl.save();

        res.status(201).json({
            shortUrl: `${BASE_URL}/${customCode}`,
            expiry: expiryDate.toISOString()
        });
    } catch (err) {
        res.status(500).json({ error: 'Server error', details: err.message });
    }
};

const redirectUrl = async (req, res) => {
    try {
        const { code } = req.params;
        const entry = await Url.findOne({ shortCode: code });

        if (!entry) return res.status(404).json({ error: 'Short URL not found' });

        const now = new Date();
        if (now > entry.expiryDate) {
            return res.status(410).json({ error: 'Short URL expired' });
        }

        entry.clicks.push({ timestamp: now });
        await entry.save();

        res.redirect(entry.originalUrl);
    } catch (err) {
        res.status(500).json({ error: 'Server error', details: err.message });
    }
};

const getStatistics = async (req, res) => {
    try {
        const { code } = req.params;
        const entry = await Url.findOne({ shortCode: code });

        if (!entry) return res.status(404).json({ error: 'Short URL not found' });

        res.status(200).json({
            shortCode: code,
            originalUrl: entry.originalUrl,
            createdAt: entry.createdAt.toISOString(),
            expiryDate: entry.expiryDate.toISOString(),
            totalClicks: entry.clicks.length,
            clickDetails: entry.clicks.map(c => ({ timestamp: c.timestamp.toISOString() }))
        });
    } catch (err) {
        res.status(500).json({ error: 'Server error', details: err.message });
    }
};

module.exports = {
    createShortUrl,
    redirectUrl,
    getStatistics
};
