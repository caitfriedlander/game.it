var mongoose = require('mongoose');
var Schema = mongoose.Schema;

//Sender of the message
var chatSchema = new Schema({
    username: String,
    message: String,
}, {
    timestamps: true
})

var chatRoomSchema = new Schema({
    users: [{type: Schema.Types.ObjectId, ref: 'User'}],
    chats: [chatSchema]
});

module.exports = mongoose.model('ChatRoom', chatRoomSchema);


