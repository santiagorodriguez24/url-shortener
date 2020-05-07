const express = require('express');
const UrlShortenerController = require('../controllers/UrlShortenerController');

const app = express();

app.post("/shorturl", UrlShortenerController.shortenUrl);

app.get("/shorturl/:code", UrlShortenerController.getUrl);

module.exports = app;