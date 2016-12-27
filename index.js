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
      if(!bcrypt.compareSync(req.body.password, user.password))
        throw new Error("Invalid username or password");
      return user;
    })
    .then(function(user){
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

module.exports.routes = router;



// Code for middleware

module.exports.authMiddleware = function(req,res,next){
  var token = req.body.token || req.query.token || req.headers['x-access-token'];
  req.user = {};
  if(token){
    jwt
      .verify(token,req.app.get("secret"),function(err,decoded){
        if(err){
          req.user.isAuthenticated = false;
          next();
        }else{
          req.user = decoded;
          req.user.isAuthenticated = true;
          next();
        }
      });
  }else{
    req.user.isAuthenticated = false;
    next();
  }
}

module.exports.protect = function(req,res,next){
  if(!req.user.isAuthenticated){
    res.status(403);
    res.json({error:"Authentication required"});
  }else{
    next();
  }
}
