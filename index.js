// require needed modules
var bodyParser = require('body-parser');
var ejsLayouts = require('express-ejs-layouts');
var express = require('express');
var flash = require('connect-flash');
var passport = require('./config/passportConfig');
var session = require('express-session');
var db = require('./models');

// Declare app variable 
var app = express();

// These lines makes the session use sequelize to write session data to a db table
var SequelizeStore = require('connect-session-sequelize')(session.Store);

var sessionStore = new SequelizeStore({
  db: db.sequelize,
  expiration: 30 * 60 * 1000 // expire in 30 minutes
});

// Set and use statements
app.set('view engine', 'ejs');
app.use(ejsLayouts);
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static('public'));
app.use(session({
    secret: 'abc',
    resave: false,
    saveUninitialized: true,
    store: sessionStore
}));
// Make sure session is above these
sessionStore.sync(); // creates the sessions table
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());

/// Custom middleware -FUN!
app.use(function (req, res, next) {
    res.locals.currentUser = req.user;
    res.locals.alerts = req.flash();
    next();
});

// Controllers
app.use('/auth',require('./controllers/auth.js'));
app.use('/profile',require('./controllers/profile.js'));

// Define routes
app.get('/', function (req, res){
    res.render('home');
});

app.post('/commands',function (req,res){
    console.log(req.body);
    db.commands.create(req.body).then(function(createdRow) {
        db.usercommand.create(req.body).then(function (createdUserCommand) {
            res.send(createdUserCommand);
        }).catch(function (err) {
            res.send(err);  
        });
    }).catch(function(err){
        res.send(err);  
    });
});
app.get('/commands', function(req, res) {
    db.commands.findAll().then(function(commandList){
    res.send(commandList);
    });
});

app.get('*', function (req, res) {
    res.render('error');
});

// Listen on port 3000
app.listen(process.env.PORT || 3000);
