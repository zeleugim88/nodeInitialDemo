const express  = require('express');
const http     = require('http');
const socketio = require('socket.io');
const path     = require('path');

const Sockets  = require('./sockets');

class Server {

    constructor() {

        this.app  = express();
        this.port = process.env.PORT;

        this.server = http.createServer( this.app ); // Http server
        
        this.io = socketio( this.server, { /* socket configurations */ } );
    }

    middlewares() {
        this.app.use( express.static( path.resolve( __dirname, '../public' ) ) );
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