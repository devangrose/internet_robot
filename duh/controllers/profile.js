// Require express
var express = require('express');

// Declare a new router
var router = express.Router();

var loggedIn = require('../middleware/loggedin');

// Define routes
router.get('/', loggedIn,function (req, res) {
    res.render('profile/index.ejs');
});


module.exports = router;
