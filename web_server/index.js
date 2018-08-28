// Require needed node modules
var bodyParser = require('body-parser');
var ejsLayouts = require('express-ejs-layouts');
var express = require('express');
var request = require('request');

var PI_URL = 'http://localhost:80';

// Global variables
var app = express();

// Set and use statements
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(ejsLayouts);

// Define routes
app.get('/', function (req, res) {
    var body1;
    var commands = request.get(PI_URL + '/queue',function (error, response, body) {
        res.send(body);
    });
});
app.get('/test', function (req, res) {
    request.post(PI_URL + '/queue').form({name:'testing2'});
    res.redirect('/');
});
app.post('/ip', function (req, res) {
    PI_URL ='http://' + req.body.ip;
    res.send(PI_URL);
});

// listen on port 3000
app.listen(3001, function (){
    console.log('listening on port 3000');
});
