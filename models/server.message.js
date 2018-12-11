/**
 * Created by asmitty on 3/16/17.
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var messageSchema = new Schema({
    messageBody: String,
    userId: String,
    conversationId: String,
    createdAt: {type: Date, default: Date.now}
});

module.exports = mongoose.model("Message", messageSchema, "Messages");