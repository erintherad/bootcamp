// require express and other modules
var express = require('express'),
    app = express(),
    bodyParser = require('body-parser'),  // for data from the request body
    mongoose = require('mongoose'),       // to interact with our db
    Gif = require('./models/gif');

// connect to mongodb
mongoose.connect(
  process.env.MONGOLAB_URI ||
  process.env.MONGOHQ_URL ||
  'mongodb://localhost/bootcamp'
);

// configure body-parser
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

// send back all gifs
app.get('/api/gifs', function (req, res) {
  Gif.find({}, function (err, gifs) {
    res.json(gifs);
  });
});

// create new gif
app.post('/api/gifs', function (req, res) {
  // create new gif with data from the body of the request (`req.body`)
  // body should contain the gif text itself
  var newGif = new Gif({
    title: req.body.title,
    url: req.body.url,
    date: Date.now()
  });

  // save new gif
  newGif.save(function (err, savedGif) {
    res.json(savedGif);
  });
});

// update gif, but only the part(s) passed in in the request body
app.put('/api/gifs/:id', function (req, res) {
  // set the value of the id
  var targetId = req.params.id;

  // find gif in db by id
  Gif.findOne({_id: targetId}, function (err, foundGif) {
    // update the gif's text, if the new text passed in was truthy
    // otherwise keep the same text
    foundGif.title = req.body.title || foundGif.title;

    // save updated gif in db
    foundGif.save(function (err, savedGif) {
      res.json(savedGif);
    });
  });
});

// set location for static files
app.use(express.static(__dirname + '/public'));

// load public/index.html file (angular app)
app.get('*', function (req, res) {
  res.sendFile(__dirname + '/public/views/index.html');
});

// listen on port 3000
app.listen(process.env.PORT || 3000, function () {
  console.log('server started on localhost:3000');
});