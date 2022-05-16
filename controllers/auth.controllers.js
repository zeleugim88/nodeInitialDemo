const { response } = require("express");
const { validationResult } = require('express-validator');
//use "response" from express to show res.status, res.json...

const createUser = async (req, res = response) => {
        res.json({ ok: true, msg: 'fake'})
}

const loginUser = async (req, res = response) => { 

    //Express validator returns the errors from the request
    const errors = validationResult( req ) 

    if ( !errors.isEmpty() ) {
        return res.status(400).json({
            ok: false,
            errors: errors.mapped() 
            //mapped() is a function created by "validationResult" (Express Validator)
        })
    }
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
