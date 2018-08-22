// Require needed node modules
var bodyParser = require('body-parser');
var ejsLayouts = require('express-ejs-layouts');
var express = require('express');


// Global variables
var app = express();
var db = require('./models');

// Set and use statements
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(ejsLayouts);

// Define routes
app.get('/', function (req, res) {
    res.render('home');
});

// listen on port 3000
app.listen(3000, function (){
    console.log('ONE OF US, ONE OF US, ONE OF US');
});
