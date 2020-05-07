'use strict'
require('./config/config');
const mongoose = require("mongoose");

const mongoURI = process.env.DATABASE;

const connectOptions = {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false
};

mongoose.Promise = global.Promise;

mongoose.connect(mongoURI, connectOptions)
    .then(() => {
        console.log("The connection to the database was successful.")

        require('./app');

    })
    .catch(error => console.log('The connection to the database failed.', error));

