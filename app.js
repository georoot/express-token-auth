var express = require('express');
var mongoose = require('mongoose');
var authMod = require('./index');

mongoose.connect('mongodb://localhost/test');
mongoose.Promise = global.Promise;
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log("Connected to mongodb");
});

var app = express();

app.get('/', function (req, res) {
  res.send('Hello World!')
});

app.use("/auth",authMod);

app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
});

module.exports = app;
