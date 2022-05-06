const port = 8080
const path = require("path");

const getOtherPagesController = (req,res) => {
    res.status(404).json({
      message: "Page not found"
    })
  }

const getHomePageController = (req, res) => {
    res.json({
      message: 'Entrega 4.1: Node REST Server APP'
    })
  }

const getUserPageController = (req, res) => {
    res.json({
      name: 'Daniel M.',
      age: 34,
      url: req.protocol + "://" + req.hostname + ":"+port + req.originalUrl //no hardcodear
      //https://expressjs.com/es/api.html => req.protocol, req.hostname, req.originalUrl
    })
  }

const getUploadPageController = (req, res) => {
    res.sendFile(path.join(__dirname, `../public/upload.html`)) 
  }

//ERROR POSTMAN BROWSER=> https://www.youtube.com/watch?v=cE8bUBalPxk
const postUploadPageController = (req, res, next) => {
    res.json({
      message: "Image Uploaded"
    });
  }

const postTimePageController = (req, res) => {
  const user  = req.headers.name;
  console.log("Requester: ", user);
  const date = new Date();
  res.json({
    date
  });
}

module.exports = {
    getOtherPagesController,
    getHomePageController,
    getUserPageController,
    getUploadPageController,
    postUploadPageController,
    postTimePageController
}