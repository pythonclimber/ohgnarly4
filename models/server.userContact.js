/**
 * Created by asmitty on 3/16/17.
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userContactSchema = new Schema({
    userId: String,
    contactId: String,
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model("UserContact", userContactSchema, "UserContacts");