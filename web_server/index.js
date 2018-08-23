// Require needed node modules
var bodyParser = require('body-parser');
var ejsLayouts = require('express-ejs-layouts');
var express = require('express');
var request = require('request');

var PI_URL = 'http://localhost:8000';

// Global variables
var app = express();

// Set and use statements
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(ejsLayouts);

// Define routes
app.get('/', function (req, res) {
    var commands = request.get(PI_URL + '/commands',function (error, response, body) {
        res.send(body);
    });
});
app.post('/ip', function (req, res) {
    console.log(req);
    PI_URL = 'http://' + req.body.ip;
    console.log(PI_URL);
    res.send(PI_URL);
});

// listen on port 3000
app.listen(3000, function (){
    console.log('ONE OF US, ONE OF US, ONE OF US');
});
