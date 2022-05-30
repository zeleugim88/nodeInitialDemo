const URL = 'http://localhost:3000';
var userData = JSON.parse(window.sessionStorage.getItem('user_data'));

//Declare html variables
const miniFooterLeft = document.querySelector('.mini-footer-left')
const roomSidebar = document.querySelector('.buttons_box');
const newRoomButton = document.getElementById('newRoom');

import {  
    getUser } from './helpers/fetchUsers.js';

import {
    createRoom,
    getRooms,
    getUserInRoom } from './helpers/fetchRooms.js'


//Load name and room buttons when opening window
if(userData){
    const data = userData;
    data.room = '';
    data.socket = '';
    window.sessionStorage.setItem('user_data', JSON.stringify(data));
    userData = JSON.parse(window.sessionStorage.getItem('user_data'));
}

getUser().then(userName => miniFooterLeft.innerHTML = `<h2>Space Settler "${userName}" connected</h2>`);

getRooms().then((rooms)=>{
    var newLine = ``;
    console.log(rooms)
    for (const room of rooms){
        newLine += `<button class="sidebar_buttons" id="room${room.name}">${room.name}: ${room.roomUsers} users</button>`;
    }
    roomSidebar.innerHTML = newLine;
    
    for (const room of rooms){
        const changeRoomButton = document.getElementById(`room${room.name}`);
        changeRoomButton.addEventListener('click', (e)=>{
            e.preventDefault();

            getUserInRoom({room: room.name});
        });
    }
});

//New Room Button-EventListener
newRoomButton.addEventListener('click', (e)=>{
    e.preventDefault();

    const name = document.getElementById('roomName');
    const objectData = {name: name.value};
    
    createRoom(objectData)
    .then((room)=>getUserInRoom({room: room.name}))
    .catch(e=>undefined);
});

