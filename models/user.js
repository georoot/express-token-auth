var mongoose = require('mongoose');
require('mongoose-type-email');
var Schema = mongoose.Schema;

// set up a mongoose model and pass it using module.exports
module.exports = mongoose.model('User', new Schema({
    email: {type: mongoose.SchemaTypes.Email, required: true,index: { unique: true }},
    password: {type: String, required: true},
    verified: Boolean
}));
