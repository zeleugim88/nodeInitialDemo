
const URL = 'http://localhost:3000';
const userData = JSON.parse(window.sessionStorage.getItem('user_data'));
const socket = io(URL);

//Declare HTML elementes as variables
const $messages = document.querySelector("#messages");
const $messageForm = document.querySelector('#message-form');
const $messageFormInput = $messageForm.querySelector('input');
const messageButton = document.getElementById('send-message');
const changeRoomButton = document.getElementById('change-room');
const logOutButton = document.getElementById('logout');

const autoscroll = () => {
    //https://stackoverflow.com/questions/25505778/automatically-scroll-down-chat-div
    const $newMessage = $messages.lastElementChild; //New message - Element
    const newMessageStyles = getComputedStyle($newMessage);
    const newMessageMargin = parseInt(newMessageStyles.marginBottom);
    const newMessageHeight = $newMessage.offsetHeight + newMessageMargin;     //New message - Height
    const visibleHeight = $messages.offsetHeight;     //Visible Height
    const containerHeight = $messages.scrollHeight; //Messages container - Height
    const scrollOffset = $messages.scrollTop + visibleHeight; // Distance scrolled

    if (containerHeight - newMessageHeight <= scrollOffset) {
        $messages.scrollTop = $messages.scrollHeight;
    }
};

//Exit chat to main Menu if something is missing
if(!userData) location.href='./menu.html';
if(!userData.room) location.href='./menu.html';

//Socket emits "join" event automatically when entering chat 
socket.emit('join', {user:userData.name, room:userData.room}, (error)=>{
    if (error) {
        alert(error);
        window.location='./menu.html';
    }
});

//Create message object and insert it in the html
socket.on('message', (message)=>{
    const html = `<div class="message">
                    <p>
                        <span class="message__name">${message.user}</span>
                        <span class="message__meta">${message.date}</span>
                    </p>
                    <p>${message.text}</p>
                </div>`;
    $messages.insertAdjacentHTML('beforeend', html);
    autoscroll();
});

//Add current room data to user's interface
socket.on('roomData', ({room, users})=>{
    var list = ``;
    for (const user of users){
        list += `<li>${user}</li>`
    }
    const html = `<h2 class="room-title">${room}</h2>
                <h3 class="list-title">Users</h3>
                <ul class="users">`+list+`</ul>`;
    document.querySelector('#sidebar').innerHTML = html;
});

//Client sends message by pressing button
messageButton.addEventListener('click', (e)=>{
    e.preventDefault();

    //Disable button
    messageButton.setAttribute('disabled', 'disabled');

    const message = document.getElementById('chat-message');
    
    socket.emit('sendMessage', message.value, (a)=>{
        messageButton.removeAttribute('disabled');
        $messageFormInput.value = '';
        $messageFormInput.focus();
        console.log(a);
    });
});

//Button to change room
changeRoomButton.addEventListener('click', (e)=>{
    e.preventDefault();
    window.location='./menu.html';
});

//Log Out
logOutButton.addEventListener('click', (e)=>{
    e.preventDefault();
    window.location='./homepage.html';
});