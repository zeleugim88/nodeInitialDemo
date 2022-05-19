const { response } = require("express");
//use "response" from express to show res.status, res.json...
const bcrypt = require('bcryptjs')

const User = require('../models/user');
const { generateJWT } = require('../helpers/jwt');
const user = require("../models/user");

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

            //Save user in DB
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

    try { //Check if email already exists
        const userDB = await User.findOne({email})
        if (!userDB) {
            return res.status(404).json({
                ok: false,
                msg: 'Email no encontrado'
            })
        }
        //Validate password
        const validPassword = bcrypt.compareSync( password, userDB.password );
        if ( !validPassword ) {
            return res.status(404).json({
                ok: false,
                msg: 'Password not valid'
            })
        }
        //Generate JWT
        const token = await generateJWT( userDB.id );

        res.json({
            ok: true,
            user: userDB,
            token
        })
    } catch (error) {
        //this will be only executed if errors object is empty
    res.json({ ok: true, msg: 'login', email, password })
    }
    
}

const renewToken = async (req, res = response) => {
    
    const uid = req.uid;

    //Generate new JWT
    const token = await generateJWT( uid );

    //Get user by UID
    const user = await User.findById( uid );

    res.json({
        ok: true,
        user,
        token
    })

}

module.exports = {
    createUser,
    loginUser,
    renewToken
}
