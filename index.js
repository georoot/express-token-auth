var express = require('express');
var router = express.Router();
var User = require('./models/user');
var jwt  = require('jsonwebtoken');
var bcrypt = require('bcrypt');
const saltRounds = 10;

// Login route
router.post("/authenticate",function(req,res,next){
  User
    .findOne({email:req.body.email})
    .then(function(user){
      if(!req.body.password)
        throw new Error("Invalid username or password");
      if(!user)
        throw new Error("Invalid username or password");
      return user;
    })
    .then(function(user){
      if(user.password != req.body.password)
        throw new Error("Invalid username or password");
      return jwt.sign(user,req.app.get("secret"),{ expiresIn: '1h' });
    })
    .then(function(token){
      res.status(200);
      res.json({token:token});
    })
    .catch(function(ex){
      res.status(400);
      res.json({error: ex.message})
    })
});

// Signup route
router.post("/",function(req,res,next){
  req.body.verified = false;
  bcrypt.hash(req.body.password, saltRounds)
    .then(function(hash){
      req.body.password = hash;
    })
    .then(function(){
      return new User(req.body)
      .save();
    })
    .then(function(){
      res
        .status(200)
        .end();
    })
    .catch(function(ex){
      res.status(400);
      res.json({error:ex.message});
    })
});

router.get("/authenticate",function(req,res,next){
  console.log(req.app.get("secret"));
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
