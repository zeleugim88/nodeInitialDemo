// Server Model: Express `+ Socket.io
const Server = require('./server');

//Environment variables
require('dotenv').config();

// Server instance
const server = new Server();

// Execute server
server.execute();


