const { response } = require("express");
//use "response" from express to show res.status, res.json...

const createUser = async (req, res = response) => {
        res.json({ ok: true, msg: 'fake'})
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
