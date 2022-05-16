
//path: api/login

const { Router } = require('express');
const { check } = require('express-validator');
const { createUser,
        loginUser,
        renewToken } = require('../controllers/auth.controllers')
const router = Router();

//Endpoints definitions

//Endpoint 1: create new users
router.post( '/new', createUser)

//Endpoint 2: Login
//middle attribute is like a middlewares of this specific route
//in this case it is an array to check the express-validator requirements set in the controllers 
router.post( '/', [
    check('email', 'Email needed to log in').isEmail(),
    check('password', 'Password needed').not().isEmpty()
 ], loginUser)

//Endpoint 3: Revalidate token
router.get( '/renew', renewToken)

module.exports = router;