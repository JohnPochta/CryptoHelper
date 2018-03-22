var express = require('express');
var router = express.Router();
var path = require('path');

var registration = require('./registration/registration.js');
var authorization = require('./authorization/authorization.js');
var client_routes = require('./client_routes/client_routes.js');
router.use('/registration', registration);
router.use('/login', authorization);
router.use('/client', client_routes);
router.get('*',function(req,res){
     res.sendFile(path.join(__dirname, '../static', 'index.html'));
});

module.exports = router;