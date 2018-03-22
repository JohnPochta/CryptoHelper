var express = require('express');
var MongoClient = require('mongodb').MongoClient;
var mongoose = require('mongoose');
var app = express();
var cookieParser = require('cookie-parser');
const fileUpload = require('express-fileupload');

app.use(express.static('static'))

var bodyParser = require('body-parser');
app.use(bodyParser.json({limit : "5mb"}));
app.use(bodyParser.urlencoded({ extended : true, limit : "5mb" }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(fileUpload());



var urls = require('./routes/urls.js');

app.use('/', urls);




//add new pair in selected
/*app.post('/add_new_pair', function (req, res) {
  var new_pair = {
    name: req.body.name
  };*/
  //db.collection('Selected_Pairs').remove();
  /*db.collection('Selected_Pairs').findOne({ name: req.body.name }, function (err, doc) {
    if (err) {
      console.log(err);
      return -1;
    }
    if (doc==null){
		db.collection('Selected_Pairs').insert(new_pair, (err, result) => {
		if (err) {
			console.log(err);
			return res.sendStatus(500);
		}
			res.send(new_pair);
		});
    }
    else{
    	console.log('Heh, vpiymav na vila =)');
    	res.send({text : 'Heh, vpiymav na vila =)'});
    }
  });
});

app.post('/delete_pair', function (req, res) {
  var pair = {
    name: req.body.name
  };
  //db.collection('Selected_Pairs').remove();
  db.collection('Selected_Pairs').deleteOne( { "name" : req.body.name } );
  console.log("I'm here"+req.body.name);
  res.send(pair);
});*/

/*app.get('/is_pair_in_selected/:name', function (req, res) {
	console.log(req.params.name);
  db.collection('Selected_Pairs').findOne({ name : req.params.name }, function (err, doc) {
    if (err) {
      console.log(err);
      return res.sendStatus(500);
    }
    console.log(doc);
    res.send(doc);
  })
});*/

/*app.get('/full_array_of_selection_pairs', function (req, res) {
  db.collection('Selected_Pairs').find({}, {_id:0}).toArray(function (err, docs) {
    if (err) {
      console.log(err);
      return res.sendStatus(500);
    }
    res.send(docs);
  })
});

app.get('/is_pair_in_selected/:name', function (req, res) {
  console.log('here');
  db.collection('Selected_Pairs').findOne({ name: req.params.name }, function (err, doc) {
  	console.log(doc);
    if (err) {
      console.log(err);
      return res.sendStatus(500);
    }
    if (doc!=null){
    	res.send({name : doc.name});
    }
    else{
    	res.send({name: ''});
    }
  });
});*/


'mongodb://localhost:27017/mydb'
mongoose.connect('mongodb://heroku_60nzkgtx:sisuqlpa1p77mgornear3vibti@ds229438.mlab.com:29438/heroku_60nzkgtx');
db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  app.listen(/*process.env.PORT*/ 3012, function () {
    console.log('API app started');
  });
});






/*app.post('/kekes', function(req, res){
	console.log(req.body);
	var new_kek= {
		id : Date.now(),
		name: req.body.name
	};
});

app.put('/artists/:id', function (req, res) {
  var artist = artists.find(function (artist) {
    return artist.id === Number(req.params.id)
  });
  artist.name = req.body.name;
  res.send(artist);
});

app.delete('/artists/:id', function (req, res) {
  artists = artists.filter(function (artist) {
    return artist.id !== Number(req.params.id)
  })
  res.sendStatus(200);
});

app.get('/kek/:id', function(req, res){
	var kek = kek_zbornaya.find(function(kek){
		return kek.id === Number(req.params.id);
	});
	res.send(kek);
});*/