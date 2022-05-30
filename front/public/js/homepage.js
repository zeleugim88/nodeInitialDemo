const URL = 'http://localhost:3000';

import {  
    postNewUser,
    loginNewUser } from './helpers/fetchUsers.js';

//Sign Up - Declare HTML elementes as variables
const $signForm = document.querySelector('#sign-form');
const $signFormInput = $signForm.querySelector('input');
const signUpButton = document.getElementById('signup');

//Log In - //Declare HTML elementes as variables
const $logForm = document.querySelector('#log-form');
const $logFormInput = $logForm.querySelector('input');
const loginButton = document.getElementById('login');

window.sessionStorage.clear();

//Sign Up Button-EventListener

signUpButton.addEventListener('click', (e)=>{
    e.preventDefault();

    const name = document.getElementById('signName');
    const password = document.getElementById('signPassword');
    const objectData = {name: name.value, password: password.value};
    
    $signFormInput.value = '';
    $signFormInput.focus();

    postNewUser(objectData);
});

//Login Button-EventListener

loginButton.addEventListener('click', (e)=>{
    e.preventDefault();

    const name = document.getElementById('logName');
    const password = document.getElementById('logPassword');
    const objectData = {name: name.value, password: password.value};

    $logFormInput.value = '';
    $logFormInput.focus();

    loginNewUser(objectData);
});