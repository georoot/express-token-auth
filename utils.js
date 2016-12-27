var jwt  = require('jsonwebtoken');
var config = require('./config')


function authenticateUser(object){
  if(object.user.password != object.password)
    throw new Error("Invalid username or password");
  return object.user;
}

function userExists(user){
  if(!user)
    throw new Error("Invalid username or password");
  return user;
}

function generateUserToken(object){
  return jwt.sign(object,config.secret,{ expiresIn: '1h' });
}



module.exports.authenticateUser = authenticateUser;
module.exports.userExists = userExists;
module.exports.generateUserToken = generateUserToken;
