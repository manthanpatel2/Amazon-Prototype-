const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var categorySchema = new Schema({
    Categories: [String]
});

const categoryModel = mongoose.model('category', categorySchema);
module.exports = categoryModel; 