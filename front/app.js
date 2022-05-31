

require('dotenv').config();
const express = require('express');
const path = require('path')

const app = express()
const port = process.env.CLIENT_PORT;

//Middlewares
app.use(express.static(path.join(__dirname, 'public')));

//Homepage
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname,'./public/homepage.html'))
  })

app.listen(port,() => {
    console.log(`Client server connected in port ${port}`)
})


