var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var GameSchema = new Schema({
    apiId: String,
    title: String,
    description: String,
    platforms: [String],
    releaseDate: Date,
    coverImage: String,
    publishers: [String],
    gameUsers: [{type: Schema.Types.ObjectId, ref: 'User'}]

}, {
    timestamps: true
});

module.exports = mongoose.model('Game', GameSchema);