const User = require('../models/user.js');

//1) Sign up - Create user
const signUpController = async (req, res) => {
    try{
        const { name, password } = req.body
        const user = new User({name: name});
        if (!password || !name){
            return res.status(400).json({
                ok: false, 
                msg:'Error: Please introduce both name and password'});
        }

        const nameAlreadyExists = await User.findOne({ name })
        if (nameAlreadyExists) {
            return res.status(400).json({
                ok: false,
                msg: 'Name already existing'
            }) 
        }
        const token = await user.generateJWT(password);
        res.status(201).json({user, token});
    } catch (e){
        res.status(400).json(e);
    }
}

//2) Login user
const loginController = async (req, res)=>{
try{
    const { name, password } = req.body
    const user = await User.findUser(name, password);
    token = user.token;
    if(user.socket) {
        return res.status(400).json({
            ok: false,
            msg: 'User already logged in'
        })
    }
    res.status(200).json({user, token});
}catch(e){
    res.status(400).json({errors: e.message});
}
}

//3) Get User Info
const userInfoController = async (req, res)=>{
res.send(req.user);
};


module.exports = {
    signUpController,
    loginController,
    userInfoController,
}