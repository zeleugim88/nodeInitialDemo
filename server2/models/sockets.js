

class Sockets {
    constructor( io ) {
        this.io = io;
        this.socketEvents();
    }

    socketEvents() {
        this.io.on('connection', ( socket ) => { // On connection
            socket.on('msg-to-server', ( data ) => { //Listen event => "message-to-server"
                console.log( data );
                this.io.emit('msg-from-server', data );
            });
        });
    }
}
module.exports = Sockets;