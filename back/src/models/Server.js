
const express  = require('express');
const http     = require('http');
const cors     = require('cors');
const router = require('../routes/routes.js');

const { dbConnection } = require('../db/config');

const startSockets = require('../sockets/sockets');

class Server {

    constructor() {

        //Expres server
        this.app  = express();
        this.port = process.env.PORT;

        // Connect to DB
        dbConnection();

        // Http server (with Express mounted)
        this.httpServer = http.createServer( this.app );

        // Initiate socket server
        startSockets(this.httpServer);
    }

    middlewares() {

        // CORS
        this.app.use( cors() );

        // Parseo del body
        this.app.use( express.json() );

        this.app.use(router)
    }

    execute() {

        // Inicializar Middlewares
        this.middlewares();

        this.httpServer.listen(3000, () => {
            console.log('Server listening on port 3000');
          });

    }

}


module.exports = Server;