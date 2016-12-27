var express = require('express');
var router = express.Router();
var User = require('./models/user');

// Login route
router.post("/authenticate",function(req,res,next){
  res.send("hello world");
});

// Signup route
router.post("/",function(req,res,next){

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
