/**
 * Created by asmitty on 3/16/17.
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var postSchema = new Schema({
    title: String,
    body: String,
    userId: String,
    categoryId: String,
    createdAt: {type: Date, default: Date.now},
    modifiedAt: {type: Date, default: Date.now}
});

module.exports = mongoose.model("Post", postSchema, "Posts");