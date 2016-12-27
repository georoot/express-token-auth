var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var authMod = require('./index');
var config  = require('./config');

mongoose.connect('mongodb://localhost/tokenAuth');
mongoose.Promise = global.Promise;
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log("Connected to mongodb");
});

var app = express();
app.set("secret",config.secret);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(authMod.authMiddleware);

app.get('/',authMod.protect,function(req,res,next){
  res.json(req.user);
});

app.use("/auth",authMod.routes);

app.listen(3000,function () {
  console.log('Example app listening on port 3000!')
});

module.exports = app;
