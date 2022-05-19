const { Schema, model } = require('mongoose');

const UserSchema = Schema({
    
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true //email must be unique
    },
    password: {
        type: String,
        required: true
    },
    online: {//to show if user is connected or not
        type: String,
        default: false
    }
})

//To avoid sending the version, the user_id and the password in the future:
UserSchema.method('toJSON', function (){
    const {__v, _id, password, ...object} = this.toObject();
    object.uid = _id;
    return object;
})

module.exports = model('User', UserSchema)
//The exported model will be called 'User'and has UserSchema as schema
//mongoose will set the plural (Users) automatically
