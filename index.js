var express = require('express');
var router = express.Router();
var User = require('./models/user');

router.post("/authenticate",function(req,res,next){
  res.send("hello world");
});

router.get("/authenticate",function(req,res,next){
  User
    .find({})
    .then(function(users){
      res.json(users);
    })
    .catch(function(err){
      res.json(err);
    })
});

module.exports = router;