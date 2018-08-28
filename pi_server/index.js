// Require needed node modules
var bodyParser = require('body-parser');
var ejsLayouts = require('express-ejs-layouts');
var express = require('express');
var getIP = require('external-ip')();
var request = require('request');
var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');
var mongo = require('mongodb');
var monk = require('monk');
var db = monk('localhost:27017/commands');

var avaliableCommands = [
    {name:'turnLeft'},
    {name:'turnRight'},
    {name:'forward', duration:0},
    {name:'backward', duration: 0},{name: 'spin'} 
];

var queue = [{name:'forward', duration:7},{name: 'turnLeft'},{name: 'backward', duration: 7}, {name:'spin'}];

var PORT = 80;
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
    request.post('http://localhost:3001/ip').form({ip :ip});
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
    var collection = db.get('commandTable');
    collection.find({}, function(err, docs) {
    if (!err){ 
        res.send(docs);
    } else {throw err;}
    });
});

// Adds a list of commands to the queue
app.post('/queue', function (req, res) {
    console.log(req.body);
    var collection = db.get('commandTable');
    collection.insert({name: req.body.name}).then(function (){
    collection.find({}, function(err, docs) {
    if (!err){ 
        console.log(docs);
        res.send(docs);
    } else {throw err;}
    });
    });
});

// Returns true, used to validate a connection between 
// Web server and raspberry pi
app.get('/status', function (req, res) {
    res.send(true);
});

// listen on port 
app.listen(PORT, function (){
    console.log('listening on port', PORT);
});
