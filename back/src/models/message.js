const mongoose = require('mongoose');

const Message = mongoose.model('Message', {
    text: {
        type: String,
        required: true
    },
    date: { 
        type: String, 
        required: true
    },
    room: {
        type: String,
        required: true
    },
    user: {
        type: String,
        required: true
    }
});

module.exports = Message;