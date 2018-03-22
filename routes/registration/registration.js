var express = require('express');
var router = express.Router();
var CryptoJS = require("crypto-js");
var Users = require("../../DB/models/index.js");

/*UserSchema.plugin(filePlugin, {
    name: "photo",
    upload_to: make_upload_to_model(uploads, 'photos'),
    relative_to: uploads_base
});*/


router.get('/get', function(req, res) {
	Users.find({}, function (err, names) {
		if (err){
			res.send('ERROR');
		}
		res.send(names)
	});
}
);

router.post('/', function(req, res) {
	/*Users.deleteMany({}, function(err, users) {
		
	});*/
	res.setHeader('Content-Type', 'application/json');
	key = "IBM 360";
	Users.find({$or: [{login: req.body.login}, {email : req.body.email}]}, function(err, users){
	   	if(err){
		  	return console.log(err);
		};
	  	if (users.length){
	  		let status;
	  		users.forEach(function (elem) {
	  			if (elem.email === req.body.email){
	  				status = {status : 'ALREADY EMAIL'};
	  			}
	  			else{
	  				status = {status : 'ALREADY LOGIN'};
	  			}
	  		});
	  		res.send(JSON.stringify(status));
	  	}
	  	else{
			var new_user = new Users(
				{
					login : req.body.login,
					password: CryptoJS.HmacSHA256(req.body.password, key).words.join(''),
					email : req.body.email,
					alarms : [],
					pairs : [],
				}
			);
			new_user.save();
			res.send(JSON.stringify({status : 'OK'}));
			/*Users.find({}, function (err, name) {
				if (err){
					res.send('ERROR');
				}
				res.send(name)
			});*/
	  	}
	});;
});
	/*res.send(new_user);*/

module.exports = router;