var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var GifSchema = new Schema({
  title: String,
  url: String,
  date: String
});

var Gif = mongoose.model('Gif',GifSchema);

module.exports = Gif;