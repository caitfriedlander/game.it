var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ChatSchema = new Schema({
    conversationId: {
        type: Schema.Types.ObjectId,
        required: true
    },
    body: {
        type: String,
        required: true
    },
    author: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    } //,
    // users: [{type: Schema.Types.ObjectId, ref: 'User'}]
}, {
    timestamps: true
});

module.exports = mongoose.model('Chat', ChatSchema);