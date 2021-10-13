// Setup empty JS object to act as endpoint for all routes
projectData = {};

// Require Express to run server and routes
const express = require('express')
const port = 3000
// Start up an instance of app
const app = express()
/* Middleware*/
const bodyParser = require('body-parser')
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require('cors')
app.use(cors())
// Initialize the main project folder
app.use(express.static('website'));

// Get Route
app.get('/getData',(req,res)=>{
    res.status(200).send(projectData)
})

//Post Route
app.post('/postData',(req,res)=>{
    // new way # projectData = { ...req.body} #

    const {date,temp,content} = req.body
    projectData = {
        date,
        temp,
        content
    }
    console.log(projectData)
    res.send(projectData)
    // or res.end()
})

// Setup Server
app.listen(port,()=>{
    console.log('Server is running ...')
})