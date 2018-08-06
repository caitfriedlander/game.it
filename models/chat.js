var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ChatSchema = new Schema({
    name: String,
    avatar: String,
    users: [{type: Schema.Types.ObjectId, ref: 'User'}]
}, {
    timestamps: true
});

module.exports = mongoose.model('Chat', ChatSchema);