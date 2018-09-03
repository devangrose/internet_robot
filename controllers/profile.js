// Require express
var express = require('express');
var db = require('../models');

// Declare a new router
var router = express.Router();

var loggedIn = require('../middleware/loggedin');

// Define routes
router.get('/', loggedIn,function (req, res) {
    console.log('----------- userId:',req.user.id);
    db.usercommand.findAll({
        where: {userId : req.user.id}
    }).then(function (usercommands){
        console.log('----------- commands:', usercommands);
        res.render('profile/index.ejs',{commands: usercommands});
    }).catch(function (err) {
        res.send(err);
    });
});

router.get('/command', loggedIn, function (req, res) {
        res.render('profile/command.ejs');
});


module.exports = router;
