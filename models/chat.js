var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ChatSchema = new Schema({
    name: String,
    avatar: String,
    // users: [{type: Schema.Types.ObjectID, ref: 'User'}]
}, {
    timestamps: true
});

module.exports = mongoose.model('Chat', ChatSchema);