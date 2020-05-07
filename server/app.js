const express = require("express");
const bodyParser = require("body-parser");
const cors = require('cors');
const socketIO = require('socket.io');
const http = require('http');
const path = require('path');
require('./models/UrlShortenerModel');

const app = express();

// config CORS as middleware
app.use(cors());

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, '../client/build/')));

let server = http.createServer(app);

module.exports.io = socketIO(server);
require('./socket/socket-server');

app.use(require('./routes/UrlShortenerRoutes'));

app.get('*', function (req, res) {
    res.sendFile('index.html', { root: path.join(__dirname, '../client/build/') });
});

const port = process.env.PORT;

server.listen(port, (error) => {
    if (error) {
        throw new Error(error);
    }
    console.log(`Server listening on port: ${port}`);
});