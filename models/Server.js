
const express = require('express');
const db  = require('../database/mysql.connection.js')

class Server {
    
    constructor() {
        this.app = express();
        this.port = process.env.PORT || 3000;
        this.homePage = '/';
        this.pathPlayers = '/players';
        
        //Do not change order. 1) Connect to DB, 2) Middlewares, 3) Routes
        this.connectDB();
        this.middlewares()
        this.routes();
    }

    async connectDB() {
        try {
            await db.authenticate();
            console.log('Database online')
        } catch (error) {
            throw new Error( error );
        }
    }

    middlewares() { //other possible middlewares: cors, static...
        //Middelwares needed for POST / PUT requests and work with req.body. 
        //https://stackoverflow.com/questions/23259168/what-are-express-json-and-express-urlencoded
        this.app.use( express.json() );
        this.app.use(express.urlencoded({ //based on bodyParser
          extended: true
        }));
    }

    routes() {
        //Homepage
        this.app.get(this.homePage, (req, res) => {
            res.json({
              msg: 'HOMEPAGE',
            })
          })
        
        //Routes from /players
        this.app.use( this.pathPlayers, require('../routes/routes.players.js'));

        //Other routes
        
    }

    listen() {
        this.app.listen(this.port, async () => {
            console.log(`Example app listening on port ${this.port}`)

            //sale por consola 2 veces "executing.... " mirar a ver
            try {
                await db.sync({ force: false });
                console.log('Database connection successful');
            } catch (error) {
                console.log('Database connection failed', error);
            }
          })
    }
    
    
}

module.exports = Server