var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var messageSchema = new Schema({
    content: String,
    author: [{type: Schema.Types.ObjectId, ref: 'User'}]
}, {
    timestamps: true
});

var ChatSchema = new Schema({
    messages: [messageSchema],
    chatroomId: String,
    users: [{type: Schema.Types.ObjectId, ref: 'User'}]
}, {
    timestamps: true
});

module.exports = mongoose.model('Chat', ChatSchema);