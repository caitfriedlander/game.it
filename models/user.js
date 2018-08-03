var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = new Schema({
    googleId: String,
    name: String,
    email: String,
    icon: String,
    username: String,
    platforms: String,
    age: Number,
    gender: String,
    timezone: String,
    games: [{type: Schema.Types.ObjectId, ref: 'Game'}]

}, {
    timestamps: true
});

module.exports = mongoose.model('User', UserSchema);