require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
require('./lib/connection');
const routes = require('./routes');
const server = express();
server.use(bodyParser.urlencoded({extended: false}));
server.use(bodyParser.json());
server.listen((process.env.PORT || 3000));
//server.use(express.static('./src/client/public'));
for (var route in routes) {
    server.use(routes[route])
}