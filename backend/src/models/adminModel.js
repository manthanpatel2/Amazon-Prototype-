const mongoose = require('mongoose');

const Schema = mongoose.Schema;

var adminSchema = new Schema({
    Name: {type: String, required: true},
    Email: {type: String, required: true},
    Password: {type: String, required: true},
    ProfileURL: {type: String, required: false},
},
    {
        versionKey: false
    });

module.exports = mongoose.model('admin', adminSchema);
