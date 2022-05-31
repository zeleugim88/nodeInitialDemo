const Message = require('../models/message.js');

//HELPER TO BE USED WHEN 
//HAL9000Msg => user enters o leaves the room
//userMsg => user writes in chat

const HAL9000Msg = (text)=>{
    return {
        text,
        date: currentDate(),
        user: 'HAL9000'
    };
};

const userMsg = async (text, user) =>{
    try{
        const message = new Message({
            text: text,
            date: currentDate(),
            room: user.room,
            user: user.name
        });
        await message.save();
        return message;
    }catch(e){
        console.log(e);
    }
};

const currentDate = () =>{
    const today = new Date();
    const date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
    const time = today.getHours().toString().padStart(2, "0") + ":" 
                + today.getMinutes().toString().padStart(2, "0") + ":" 
                + today.getSeconds().toString().padStart(2, "0");
    const dateTime = date+' '+time;
    return dateTime;
};

module.exports = {
    HAL9000Msg, 
    userMsg
};


