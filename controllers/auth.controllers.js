const { response } = require("express");
//use "response" from express to show res.status, res.json...
const bcrypt = require('bcryptjs')

const User = require('../models/user');
const { generateJWT } = require('../helpers/jwt')

const createUser = async (req, res = response) => {
        try {
            const { email, password } = req.body;
            
            const emailAlreadyExists = await User.findOne({email})
            if (emailAlreadyExists) {
                return res.status(400).json({
                    ok: false,
                    msg: 'Email already existing'
                }) 
            }
            //Encriptar contraseña
            //Guardar usuario en DB
            const user = new User( req.body );

            //Generate JWT when user is created
            const token = await generateJWT ( user.id )
            
            
            res.json({
                user,
                token
            })

            //passwords must be always encrypted when saving them in db
            //salt: nº of loops to encrypt
            const salt = bcrypt.genSaltSync();
            user.password = bcrypt.hashSync(password, salt);
            //hash de una sola vía, difícil de desencriptar

            await user.save()
        

        } catch (error) {
            console.log(error);
            res.status(500).json({
                ok: false,
                msg: 'Server problem'
            })
        }
}

const loginUser = async (req, res = response) => { 

    const { email, password } = req.body;
    //this will be only executed if errors object is empty
    res.json({ ok: true, msg: 'login', email, password })
}

const renewToken = async (req, res = response) => {
    res.json({ ok: true, msg: 'renew' })
}

module.exports = {
    createUser,
    loginUser,
    renewToken
}
