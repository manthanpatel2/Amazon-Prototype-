const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');
const Schema = mongoose.Schema;
const Review = require('./reviewModel');
const Seller = require('./sellerModel');

var sellerSchema = new Schema({
    // SellerId: {type: Schema.Types.ObjectId, required: true, ref : Seller },
    SellerId: { type: String, required: true },
    Name: { type: String, required: true },
    SellerProfileUrl: { type: String }
});

var productSchema = new Schema({
    Seller: sellerSchema,
    Name: { type: String, required: true },
    Images: [{ type: String }],
    Rating: { type: Number, required: true },
    Count: { type: Number },
    Offers: [{ type: String }],
    Price: { type: Number, required: true },
    Description: { type: String, required: true },
    Reviews: [{ type: Schema.Types.ObjectId, required: true, ref: Review }],
    Categories: [{ type: String }],
});



productSchema.plugin(mongoosePaginate);
const productModel = mongoose.model('product', productSchema);
module.exports = productModel;