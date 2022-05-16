const express  = require('express');
const http     = require('http');
const socketio = require('socket.io');
const path     = require('path');
const cors     = require('cors');

const Sockets  = require('./sockets');
const { dbConnection } = require('../db/config')

class Server {

    constructor() {

        this.app  = express();
        this.port = process.env.PORT;

        dbConnection();

        this.server = http.createServer( this.app ); // Http server
        
        this.io = socketio( this.server, { /* socket configurations */ } );
    }

    middlewares() {
        this.app.use( express.static( path.resolve( __dirname, '../public' ) ) );
        
        this.app.use( cors() );
        
        //Parse body
        this.app.use( express.json() );

        //API ENDPOINTS
        this.app.use( '/api/login', require('../routers/auth.routers') ); 
    }

    setUpSockets() {
        new Sockets( this.io );
    }

    execute() {

        this.middlewares();
        this.setUpSockets();

        this.server.listen( this.port, () => {
            console.log('Server listening por:', this.port );
        });
    }
}

module.exports = Server;