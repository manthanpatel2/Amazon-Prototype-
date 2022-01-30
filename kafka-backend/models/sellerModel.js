const mongoose = require('mongoose');

const Schema = mongoose.Schema;

var addressSchema = new Schema({
    Street: {type: String, required: true},
    Apt: {type: String, required: false},
    City: {type: String, required: true},
    State: {type: String, required: true},
    Zipcode: {type: String, required: true},
    Country: {type: String, required: true},
});

var sellerSchema = new Schema({
    Name: {type: String, required: true},
    Email:  {type: String, required: true},
    Password:  {type: String, required: true},
    ProfileURL:  {type: String, required: false},
    Address: addressSchema,
    Products: [{type: String , ref : "product"}],
    Description:{type: String, required: false},
},
    {
        versionKey: false
    });

module.exports = mongoose.model('seller', sellerSchema);
