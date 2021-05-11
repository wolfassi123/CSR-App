const mongoose = require('mongoose');
const Schema = mongoose.Schema;
var passportLocalMongoose =require('passport-local-mongoose');


const userSchema = new Schema({
    admin: {
        type: Boolean,
        default: false
    }
});

userSchema.plugin(passportLocalMongoose);

var Users = mongoose.model('User', userSchema);

module.exports = Users;
module.exports = mongoose.model('Users', userSchema);