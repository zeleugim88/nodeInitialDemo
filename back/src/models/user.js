const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        unique: true,
        required: true,
        trim: true,
        minlength: 3,
        maxlength: 10
    },
    token: {
        type: String
    },
    room: {
        type: String,
        trim: true,
        maxlenght: 10,
    },
    socket: {
        type: String
    }

});

//instance method to be used during the SIGNUP
userSchema.methods.generateJWT = async function(password){
    const user = this;
    const token = jwt.sign({_id: user._id.toString()}, password);
    user.token = token;
    await user.save();
    return token;
}

//class method to be used during LOGIN
userSchema.statics.findUser = async (name, password)=>{

    const user = await User.findOne({ name });
    if (!user) {
        throw new Error('Name not found');
    }
    const decoded = jwt.verify(user.token, password);
    if (!decoded){
        throw new Error('Wrong password');
    }
    const matchUser = await User.findOne({_id: decoded._id, token: user.token});
    if (!matchUser) {
        throw new Error('Other auth issues');
    }
    return matchUser;
}

const User = mongoose.model('User', userSchema);

module.exports = User;