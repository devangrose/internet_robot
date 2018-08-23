// Require needed node modules
var bodyParser = require('body-parser');
var ejsLayouts = require('express-ejs-layouts');
var express = require('express');
var getIP = require('external-ip')();
var request = require('request');

var avaliableCommands = [
    {name:'turnLeft'},
    {name:'turnRight'},
    {name:'forward', duration:0},
    {name:'backward', duration: 0},{name: 'spin'} 
];

var queue = [{name:'forward', duration:7},{name: 'turnLeft'},{name: 'backward', duration: 7}, {name:'spin'}];

var PORT = 8000;
var WEB_SERVER_URL = 'http://localhost:3000';

// Global variables
var app = express();
//var db = require('./models');

// Set and use statements
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(ejsLayouts);

// Send IP address to web server to establish connection
getIP((err, ip) => {
    if (err) {
        // every service in the list has failed
        throw err;
    }
    /*
    request({
        method:"POST",
        url: WEB_SERVER_URL + '/ip',
        body: JSON.stringify({ip: ip})
    },
        function (error, response, body){
            console.log(body);
        });
    }
    */
    request.post('http://localhost:3000/ip').form({ip :ip});
}
);

// Define routes
app.get('/', function (req, res) {
    res.render('home');
});
// Returns the possible commands that a user could us
app.get('/commands', function (req, res) {
    var jsonPacket = JSON.stringify(avaliableCommands);
    console.log('sending',jsonPacket);
    res.status(200).send(jsonPacket);
});

// Sends the contents of the Queue
app.get('/queue', function (req, res) {
    var jsonPacket = JSON.stringify(queue); 
    res.send(jsonPacket);
});

// Adds a list of commands to the queue
app.post('/queue', function (req, res) {
    queue.push(req.body);
    res.send('thanks!');
});

// Returns true, used to validate a connection between 
// Web server and raspberry pi
app.get('/status', function (req, res) {
    res.send(true);
});

// listen on port 
app.listen(PORT, function (){
    console.log('ONE OF US, ONE OF US, ONE OF US');
});
