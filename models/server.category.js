/**
 * Created by asmitty on 3/16/17.
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var categorySchema = new Schema({
    categoryDesc: String,
    createdAt: {type: Date, default: Date.now}
});

module.exports = mongoose.model("Category", categorySchema, "Categories");