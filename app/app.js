//TO DO => ADD POSTMAN REQUESTS

const express = require('express')
const path = require("path");
const port = 8080
const cors = require("cors"); //https://www.npmjs.com/package/cors

const { upload } = require("../uploadPicture/uploadPicture");
const app = express()



//Homepage Endpoint
app.get('/', (req, res) => {
  res.json({
    message: 'Entrega 4.1: Node REST Server APP'
  })
})


//Nivell 1 - Exercici 1
//Define user endpoint and respond with json
app.get('/user', (req, res) => {
  res.json({
    name: 'Daniel M.',
    age: 34,
    url: req.protocol + "://" + req.hostname + ":"+port + req.originalUrl 
    //TODO RESUELTO: no hardcodear `http://localhost:${process.env.PORT}/user`
    //https://expressjs.com/es/api.html => req.protocol, req.hostname, req.originalUrl
  })
})

//Nivell 1 - Exercici 2
//Define endpoint GET and respond with Multer html form to upload files=> https://www.npmjs.com/package/multer
app.get('/upload', (req, res) => {
  res.sendFile(path.join(__dirname, `../public/upload.html`)) //
});

//TODO RESUELTO: hacerlo en postman => body => form data
//https://learning.postman.com/docs/getting-started/settings/
//ERROR POSTMAN BROWSER=> https://www.youtube.com/watch?v=cE8bUBalPxk
//Define endpoint POST to upload picture
app.post("/upload", upload, (req, res, next) => {
  res.json({
    message: "Image Uploaded"
  });
});

//Nivell 2  y Nivell 3

//3 middlewares for the endpoint "/time"
//CORS middleware + add "Cache-control: no-cache" to header + authorization credential check
app.use(cors());

app.use("/time", (req, res, next) => {
  res.set('Cache-control', 'no-cache')
  next()
});

//TODO RESUELTO: validar user+password con headers
app.use("/time", (req, res, next) => {
  if (req.headers.name !== "pepito" || req.headers.password !== "123456") {
    return res.status(401).json({
      message: "Credentials not valid"
    });
  }
  next();
})

//Endpoint that responses with time and date. Console shows user sent with Postman body - raw JSON
app.post("/time", express.json(), (req, res) => {
  const user  = req.headers.name;
  console.log("Requester: ", user);
  const date = new Date();
  res.json({
    date
  });
});

//Other routes
//TODO RESUELTO Evitar html de Express como respuesta 
//app.get('*',...) => no tiene en cuenta post, delete, put requests y devuelve Express html
//... SOLUCIÓN usando middleware app.use para el resto de rutas *
app.use('*', (req,res) => {
  res.status(404).json({
    message: "Page not found"
  })
})

app.listen(port, () => {
  console.log(`Entrega 4.1: Node REST Server APP listening on port ${port}`)
})