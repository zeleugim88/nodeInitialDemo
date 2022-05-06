const express = require('express')
const path = require("path");
require('dotenv').config();
const cors = require("cors"); //https://www.npmjs.com/package/cors

const port = process.env.PORT || 8080;

const { getHomePageController,
        getOtherPagesController,
        getUserPageController,
        getUploadPageController,
        postUploadPageController,
        postTimePageController } = module.require('../controllers/routes.controllers.js')

const { cacheTimePageController,
          authTimePageController } = module.require('../controllers/middleware.controllers.js')
  
const { upload } = require("../uploadPicture/uploadPicture");
const app = express()

//Endpoints
const homePage = '/';
const userPage = '/user';
const uploadPage = '/upload';
const timePage = '/time';
const otherPages = '*';

//Homepage Endpoint
app.get(homePage, getHomePageController)

//Nivell 1 - Exercici 1 => Define user endpoint and respond with json
app.get(userPage, getUserPageController)

//Nivell 1 - Exercici 2 => Define endpoint GET. Respond with Multer html form to upload files=> https://www.npmjs.com/package/multer
app.get(uploadPage, getUploadPageController);
app.post(uploadPage, upload, postUploadPageController);

//Nivell 2  y Nivell 3

//3 middlewares for the POST endpoint "/time" => CORS + cache-control + authorization
app.use(cors());
app.use(timePage, cacheTimePageController);
app.use(timePage, authTimePageController)
app.post(timePage, express.json(), postTimePageController );

//Middleware for other pages
app.use(otherPages, getOtherPagesController)

app.listen(port, () => {
  console.log(`Entrega 4.1: Node REST Server APP listening on port ${port}`)
})