
const express = require('express');
const validateJWT = require('../middlewares/validateJWT.js');
const router = new express.Router();

const {
    createRoomController,
    listOfRoomsController,
    moveUserIntoRoomController
                            } = require('../controllers/rooms.controllers.js')

const {
    signUpController,
    loginController,
    userInfoController,
                        } = require('../controllers/users.controllers.js')

const { validateInputs } = require('../middlewares/validateInputs');
const { check } = require('express-validator');
/* const { validateJWT } = require('../middlewares/validateJWT') */

//1) Sign up - Create user
router.post('/signup', [
    check('name', 'Name needed to create new user').not().isEmpty(), //express-validator mw
    check('password', 'Password needed to create new user').not().isEmpty(),
    validateInputs //express-validator mw
], signUpController);

//2) Login user
router.post('/login', [
    check('name', 'Name needed to log in').not().isEmpty(), //express-validator mw
    check('password', 'Password needed to log in').not().isEmpty(),
    validateInputs //express-validator mw
],loginController);

//3) Get User Info /users/me
router.get('/user', validateJWT, userInfoController);

//4) Create new room /users/me/rooms
router.post('/rooms', validateJWT, createRoomController);

//5) Get list of users by room
router.get('/rooms', validateJWT, listOfRoomsController);

//6) Add room to user
router.patch('/rooms', validateJWT, moveUserIntoRoomController);

module.exports = router;

