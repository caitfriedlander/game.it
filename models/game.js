var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var GameSchema = new Schema({
    googleId: String,
    gameUsers: [{type: Schema.Types.ObjectId, ref: 'User'}],
    platforms: [String]

}, {
    timestamps: true
});

module.exports = mongoose.model('Game', GameSchema);