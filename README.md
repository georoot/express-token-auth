# turall

Library to just create `token authentication` in `expressJs` faster. This is inspired by my personal needs to not have to write the same routes and models every time for a new project.

## Usage

Installation is as simple as

`npm install --save turall`

You can startoff by writing simple express application as follows

```
var express    = require('express');
var mongoose   = require('mongoose');
var bodyParser = require('body-parser');
var turall     = require('turall');

var app = express();
// You can write code to connect to mongoose here

// This is needed to encode the jwt token
app.set("secret",<Super secret>);

// This will handle auto decoding of tokens
app.use(turall.authMiddleware);

// Define all routes for authentication
app.use("/auth",turall.routes);

// Finally create protected resource
app.get('/',turall.protect,function(req,res,next){
  // req.user contains info about logged in user
  res.json(req.user);
});
```


## Creating a new user

You can create new user by posting email and password to `/auth` route from the example above. Response code is `200` for valid and `400` for invalid data.

## Authenticating user

For authentication simply post to `/auth/authenticate` in the example above. You will get a valid json with `token` as key if the credentials are a match.


## Roadmap

This is the first release and there is a lot of room for improvements. The following are the stuff i would like to work on in near future on this Library

- [ ] Add integration for custom models
- [ ] Add user mail validation
- [ ] Add `sudo` capabilities
- [ ] Better middleware
