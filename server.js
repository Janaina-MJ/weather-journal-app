// Setup empty JS object to act as endpoint for all routes
projectData = {};

// Require Express to run server and routes
const express = require('express');
// Start up an instance of app
const app = express();
/* Middleware*/
const bodyParser = require('body-parser');
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require('cors');
app.use(cors());
// Initialize the main project folder
app.use(express.static('website'));


// Setup Server
const port = 8080;

const server = app.listen(port, listening);

function listening(){
    console.log('Server Running');
    console.log(`Running on localhost: ${port}`);
}

//GET route
app.get('/all', sendData);

function sendData(req, res){
    res.send(projectData);
}

//POST route
app.post('/add', addData);

function addData(req, res){
    let data = req.body;

    console.log('server side data', data)

    //Create new properties within the object on the server (endpoint)
    //Give them value (which will come from the client side post request - req.body)

    projectData['temp'] = data.temp;
    projectData['date'] = data.date;
    projectData['userResponse'] = data.feeling;

    res.send(projectData);
}