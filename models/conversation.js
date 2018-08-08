var mongoose = require('mongoose');
Schema = mongoose.Schema;

var conversationSchema = new Schema({
    participants: [{type: Schema.Types.ObjectId, ref: 'User'}]
});

module.exports = mongoose.model('Conversation', conversationSchema);