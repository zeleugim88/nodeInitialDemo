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
    age: 33,
    url: req.protocol + "://" + req.get("Host") + req.originalUrl //No hardcodear!!! `http://localhost:${port}/user`
    //protocol => http, req.get("Host") => localhost:8080 + 
    //TODO ver opciones para no hardcodear esto
  })
})

//Nivell 1 - Exercici 2
//Define endpoint GET and respond with Multer html form to upload files=> https://www.npmjs.com/package/multer
app.get('/upload', (req, res) => {
  res.sendFile(path.join(__dirname, `../public/upload.html`)) //
});

//TODO hacerlo en postman => body => form data
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

app.use("/time", (req, res, next) => {
  if (!req.headers.authorization) {
    //return res.status(403).json({ error: 'No credentials sent!' });
    return res.status(401).send("Credentials not valid");
  }
  //else {return res.send('"Cache-control" - "no-cache" set in headers')}
  next();
})

//TODO Comprobar su contenido de headers
//Endpoint that responses with time and date. Console shows user sent with Postman body - raw JSON
app.post("/time", express.json(), (req, res) => {
  const { user } = req.body
  console.log("Requester: ", user);
  const date = new Date();
  res.json({
    date
  });
});

//Other routes
//TODO solo vale para GET app.get es mejor usar app.use
app.use('*', (req,res) => {
  res.status(404).json({
    message: "Page not found"
  })
})

app.listen(port, () => {
  console.log(`Entrega 4.1: Node REST Server APP listening on port ${port}`)
})