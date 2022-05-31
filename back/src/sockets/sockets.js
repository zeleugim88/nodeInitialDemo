const { Server } = require("socket.io");

const Message = require("../models/message.js");
const User = require('../models/user.js');
const {HAL9000Msg, userMsg} = require('../helpers/msg.js');
const getUsersInRoom = require('../helpers/users.js');

//Initiate server in index.js

const startSockets = (httpServer) => {
    const io = new Server(httpServer, {
        cors: {
            origin: "*"
        }
    })
    io.on("connection", (socket) => {

        console.log(`SOCKET HANDSHAKE SUCCESSFUL`);
      
        socket.on('join', async (data) => {
            try{
                //console.log(data) //{ user: 'userX', room: 'roomX' }
                const userChangingRoom = await User.findOne({name: data.user});
                //console.log(userEnteringRoom) //{_id, name, token, __v, room, socket}

                //Update User's room and socket when connecting
                userChangingRoom.room = data.room;
                userChangingRoom.socket = socket.id;
                await userChangingRoom.save();
                const room = userChangingRoom.room;

                //Server allows client socket to join room and load old messages
                socket.join(room);
                const oldMessages = await Message.find({room});
                for (const message of oldMessages){
                    socket.emit('message', message);
                }

                //The mothership computer says hello to userEnteringRoom
                socket.emit('message', HAL9000Msg(`Welcome aboard, ${userChangingRoom.name}`)); 

                //The mothership computer tells the other users in Room that userEnteringRoom has connected
                socket.broadcast.to(room)
                .emit('message', HAL9000Msg(`${userChangingRoom.name} connected successfuly`));

                //Emit updated info to this room
                io.to(room).emit('roomData', {
                    room,
                    users: await getUsersInRoom(room)
                });

            }catch(e){
                console.log(e);

            }
        });

        //Server receives and broadcast message to all users in room
        socket.on('sendMessage', async (message, callback)=>{
            try{
                const user = await User.findOne({socket: socket.id});
                io.to(user.room).emit('message', await userMsg(message, user));
                await callback('Message Delivered');

            }catch(e){
                console.log(e);
            }
        });

        socket.on('disconnect', async ()=>{
            try{
                //With socket.id, search user in DB
                const disconnectedUser = await User.findOne({socket: socket.id});
                const room = disconnectedUser.room;
                console.log(`Connection lost with ${disconnectedUser.name}.`);

                //Delete user socket and user room when user is leaving room
                disconnectedUser.socket = '';
                disconnectedUser.room = '';
                await disconnectedUser.save();
                
                //HAL tells everybody in the room that user left
                io.to(room).emit('message', HAL9000Msg(`Connection lost with ${disconnectedUser.name}.`));

                //Update users in room
                io.to(room).emit('roomData', {
                    room : room,
                    users: await getUsersInRoom(room)
                });
            }catch(e){
                console.log(e);
            }                    
        });
    });

    return io;
}

module.exports =  startSockets ;
