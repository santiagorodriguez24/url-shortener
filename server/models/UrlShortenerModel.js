const mongoose = require("mongoose");
const uniqueValidator = require('mongoose-unique-validator');

const { Schema } = mongoose;

const urlShortenerSchema = new Schema({
    originalUrl: {
        type: String,
        required: [true, 'originalUrl is Required.']
    },
    urlCode: {
        type: String,
        unique: true,
        required: [true, 'urlCode is Required.']
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    hitCount: {
        type: Number,
        default: 0
    },
});

// Error handling through a plugin that allows to show a more descriptive error to the user.
urlShortenerSchema.plugin(uniqueValidator, { message: 'The code generated for this url already exists in DB.' });

module.exports = mongoose.model("UrlShortener", urlShortenerSchema);