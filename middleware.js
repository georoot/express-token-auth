var jwt = require('jsonwebtoken');

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
