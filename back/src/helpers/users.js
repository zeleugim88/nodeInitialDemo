const User = require('../models/user.js');

//HELPER TO BE USED to update users in room at the end of socket events
//when user enters or leaves a room
//socket.on("join") // socket.on("disconnect")

const getUsersInRoom = async(room) => {
    const usersArray = await User.find({ room: room });
    const users = [];
    for (let i = 0; i < usersArray.length; i++) {
        users.push( usersArray[i].name )
    }
    return users;
}

module.exports = getUsersInRoom;