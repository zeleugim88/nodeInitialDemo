const jwt = require('jsonwebtoken');
const User = require('../models/user.js');

//MIDDLEWARE TO BE USED IN ENDPOINTS
// 3.GET USER // 4.POST ROOM // 5.GET ROOM // 6.PATCH ROOM

const validateJWT = async (req, res, next)=>{
    try{

        const token = req.header('Authorization').replace('Bearer ', '');
        //Option 1: missing token
        if (!token){
            return res.status(400).json({
                ok: false,
                msg: 'Error: Missing token'
            }) 
        }

        const user = await User.findOne({ token: token });
        //Option 2: wrong token because it does not find any user
        if (!user){
            return res.status(400).json({
                ok: false,
                msg: 'Error: Authentication failed'
            }) 
        }
        //Save token and user in the request to send to next middleware
        req.token = token;
        req.user = user; 
        next();

    }catch(e){
        res.status(400).json(e);
    }
}

module.exports = validateJWT;  