const mongoose = require('mongoose');

const Schema = mongoose.Schema;

var customerSchema = new Schema({
    name: String,
    email: String,
    password: String,

},
    {
        versionKey: false
    });

module.exports = mongoose.model('customer', customerSchema);
