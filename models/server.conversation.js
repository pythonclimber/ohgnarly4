/**
 * Created by asmitty on 7/10/18.
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var conversationSchema = new Schema({
    userId1: String,
    userId2: String
});

module.exports = mongoose.model("Conversation", conversationSchema, "Conversations");