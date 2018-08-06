var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = new Schema({
    googleId: String,
    name: String,
    email: String,
    avatar: String,
    username: String,
    platforms: [{type: String, enum: ['Linux', 'Mac', 'PC (Microsoft Windows)', 'Nintendo Switch', 'PlayStation 4', 'Xbox One', 'Xbox 360', 'PlayStation 3']}],
    age: Number,
    gender: String,
    timezone: String,
    games: [{type: Schema.Types.ObjectId, ref: 'Game'}]
}, {
    timestamps: true
});

// static method to get platforms

module.exports = mongoose.model('User', UserSchema);