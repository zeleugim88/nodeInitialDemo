


const { Router } = require('express');

const router = Router();

//Endpoints definitions

//Endpoint 1: create new users
router.post( '/new', (req, res) => {
    res.json({ ok: true, msg: 'fake' })
})

//Endpoint 2: Login
router.post( '/', (req, res) => {
    res.json({ ok: true, msg: 'login' })
})

//Endpoint 3: Revalidate token
router.get( '/renew', (req, res) => {
    res.json({ ok: true, msg: 'renew' })
})

module.exports = router;