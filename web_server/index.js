// Require needed node modules
var bodyParser = require('body-parser');
var ejsLayouts = require('express-ejs-layouts');
var express = require('express');
var request = require('request');
var db = require('./models');

// Global variables
var app = express();

// Set and use statements
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(ejsLayouts);

// Define routes
app.get('/', function (req, res) {
    res.render('home');
});

app.post('/commands',function (req,res){
    console.log(req.body);
    db.commands.create(req.body).then(function(createdRow) {
        res.send(createdRow);
    }).catch(function(err){
        res.send(err);  
    });
});
app.get('/commands', function(req, res) {
    db.commands.findAll().then(function(commandList){
    res.send(commandList);
    });
});

// listen on port 3000
app.listen(3000, function (){
    console.log('listening on port 3000');
});
