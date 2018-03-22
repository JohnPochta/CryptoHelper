var express = require('express');
var router = express.Router();
//var CryptoJS = require("crypto-js");
var Users = require("../../DB/models/index.js");
var jwt = require('jsonwebtoken');
var cookieParser = require('cookie-parser');
var ObjectID = require('mongodb').ObjectID;
const {Upload,Resources,Delete} = require('../../DB/uploader.js');
const cloudinary = require('cloudinary').v2;

router.get('/selected_pairs', function(req, res){
  let key_ = "JOHN POCHTA PRODUCTION EPTA";
  jwt.verify(req.cookies.CH, key_, function(err, decoded) {
	  if (err) {
	  	res.send(JSON.stringify({status : 'Wrong'}));
	  }
	  else{
		Users.findOne( { _id : decoded.id } , function (err, user) {
			if(err){
			  	res.send(JSON.stringify({status : 'Wrong'}));
			}
			else{
				res.send(JSON.stringify({pairs : user.pairs}));
			}
	    });
	  }
  });
});

router.get('/:page', function(req, res) {
  let key_ = "JOHN POCHTA PRODUCTION EPTA";
  jwt.verify(req.cookies.CH, key_, function(err, decoded) {
	  if (err) {
	  	res.send(JSON.stringify({status : 'Wrong'}));
	  }
	  else if ((req.params.page==='homepage') || (req.params.page==='analizator')){
		Users.findOne( { _id : decoded.id } , function (err, user) {
			if(err){
			  	res.send(JSON.stringify({status : 'Wrong'}));
			}
			else{
				res.send(JSON.stringify({login : user.login, pairs : user.pairs, picture : user.picture}));
			}
	    });
	  }
  });
});

router.post('/add_new_pair', function (req, res){
	res.setHeader('Content-Type', 'application/json');
	let key_ = "JOHN POCHTA PRODUCTION EPTA";
	jwt.verify(req.cookies.CH, key_, function(err, decoded) {
	  if (err) {
	  	res.send(JSON.stringify({status : 'Wrong'}));
	  }
	  else{
		Users.findOneAndUpdate({ _id : decoded.id }, {"$push": { "pairs": req.body.name }},
			{ "new": true, "upsert": true },
			function (err, user) {
			if(err){
			  	res.send(JSON.stringify({status : 'Wrong'}));
			}
			else{
				res.send(JSON.stringify({status : 'OK'}));
			}
	    });
	  }
  	});
});


/**/

router.post('/delete_pair', function (req, res){
	res.setHeader('Content-Type', 'application/json');
	let key_ = "JOHN POCHTA PRODUCTION EPTA";
	jwt.verify(req.cookies.CH, key_, function(err, decoded) {
	  if (err) {
	  	res.send(JSON.stringify({status : 'Wrong'}));
	  }
	  else{
		Users.findOneAndUpdate({ _id : decoded.id }, 
		{"$pull": { "pairs": req.body.name }}, { "new": true}, 
		function (err, user) {
			if(err){
			  	res.send(JSON.stringify({status : 'Wrong'}));
			}
			else{
				res.send(JSON.stringify({status : 'OK'}));
			}
	    });
	  }
  	});
});

router.post('/upload_avatar', function(req, res) {
	let key_ = "JOHN POCHTA PRODUCTION EPTA";
	jwt.verify(req.cookies.CH, key_, function(err, decoded){
	  if (err) {
	  	res.send(JSON.stringify({status : 'Wrong'}));
	  }
	  else{
	  	  Users.findOne({ _id : decoded.id}, function(err, user){
	  		if(err){
			  	res.send(JSON.stringify({status : 'Wrong'}));
			}
			else{
				cloudinary.uploader.destroy(user.picture, function(result) { console.log(result) });
			}
	  	  });
	  	  let imageFile = req.files.file;
		  Upload('data:image/png;base64,' + new Buffer(imageFile.data).toString('base64'), {use_filename:true})
		  .then(result => {
		  	Users.findOneAndUpdate({ _id : decoded.id }, 
				{"$set": { "picture": result.url }}, { new : true }, 
				function (err, user) {
					if(err){
					  	res.send(JSON.stringify({status : 'Wrong'}));
					}
					else{
						res.send(JSON.stringify({status : 'OK'}));
					}
			    }
		    );
		  })
        /*res.render('uploaded',{photo_url:result.urls}))
        .catch(err => console.error(err));
		/*Users.findOneAndUpdate({ _id : decoded.id }, 
		{"$set": { "picture": req.body.name }}, { "new": true}, 
		function (err, user) {
			if(err){
			  	res.send(JSON.stringify({status : 'Wrong'}));
			}
			else{
				res.send(JSON.stringify({status : 'OK'}));
			}
	    });*/
	  }
  	});
});

router.post('/logout', function(req, res) {
	res.clearCookie('CH'); 
	res.send(JSON.stringify({status : 'paka'}));
});

module.exports = router;