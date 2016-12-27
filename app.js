var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var authMod = require('./index');

mongoose.connect('mongodb://localhost/tokenAuth');
mongoose.Promise = global.Promise;
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log("Connected to mongodb");
});

var app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use("/auth",authMod);

app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
});

module.exports = app;
