const mongoose = require('mongoose');

const clickSchema = new mongoose.Schema({
    timestamp: { type: Date, default: Date.now }
});

const urlSchema = new mongoose.Schema({
    originalUrl: { type: String, required: true },
    shortCode: { type: String, unique: true, required: true },
    createdAt: { type: Date, default: Date.now },
    expiryDate: { type: Date, required: true },
    clicks: [clickSchema]
});

module.exports = mongoose.model('Url', urlSchema);
