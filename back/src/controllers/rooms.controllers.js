
const User = require('../models/user.js');
const Room = require('../models/room.js');


//4) Create new room
const createRoomController = async (req, res)=>{
    const room = new Room(req.body);
    try{
        await room.save();
        res.status(201).json(room);
    }catch(e){
        res.status(400).json(e);
    }
}

//5) Get list of rooms with number of users each
const listOfRoomsController = async (req, res)=>{
    try{

        const rooms = await Room.find();
        const allRooms = [];
        for (let i = 0; i < rooms.length; i++) {
            const roomUsers = await User.find( { room: rooms[i].name}).count();
            const room = { name: rooms[i].name, roomUsers };
            allRooms.push(room);
        }

        //Sort by number of users
        res.status(200).json(allRooms.sort((a, b) => {
            return b.roomUsers - a.roomUsers
        }));
    }catch(e){
        res.status(400).json(e);
    }
}

//6) Set user's current room
const moveUserIntoRoomController = async(req,res)=>{
    req.user.room = req.body.room;
    try{
        await req.user.save();
        res.status(201).json(req.user);
    } catch(e){
        res.status(400).json(e);
    }
}

module.exports = {
    createRoomController,
    listOfRoomsController,
    moveUserIntoRoomController,
}