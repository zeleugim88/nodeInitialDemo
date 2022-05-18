
//path: api/login

const { Router } = require('express');
const { check } = require('express-validator');
const { createUser,
        loginUser,
        renewToken } = require('../controllers/auth.controllers')
const { validateInputs } = require('../middlewares/validateInputs')
const { validateJWT } = require('../middlewares/validateJWT')
const router = Router();

//Endpoints definitions

//Endpoint 1: create new users
router.post( '/new',[
    check('name', 'Name needed to create new user').not().isEmpty(), //express-validator mw
    check('email', 'Email needed to create new user').isEmail(), //express-validator mw
    check('password', 'Password needed to create new user').not().isEmpty(),
    validateInputs //express-validator mw
], createUser)

//Endpoint 2: Login
//middle attribute is like a middlewares of this specific route
//in this case it is an array to check the express-validator requirements set in the controllers 
router.post( '/', [
    check('email', 'Email needed to log in').isEmail(), //express-validator mw
    check('password', 'Password needed to log in').not().isEmpty(), //express-validator mw
    validateInputs //custom-made middleware to avoid controller "loginUser" to execute if errors found by express-validator
 ], loginUser)

//Endpoint 3: Revalidate token
router.get( '/renew', validateJWT, renewToken)

module.exports = router;