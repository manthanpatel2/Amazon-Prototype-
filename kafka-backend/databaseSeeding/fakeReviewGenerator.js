var faker = require('faker');
var fs = require('fs');
var bcrypt = require("bcrypt");
const mongoose = require('mongoose');
const { mongoDB } = require('../config');
var Customer = require('../models/customerModel');
var Product = require('../models/productModel');
var Review = require('../models/reviewModel');

var CUSTOMERS_SIZE = 50;

var options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    poolSize: 400,
    bufferMaxEntries: 0
};

mongoose.connect(mongoDB, options, (err, res) => {
    if (err) {
        console.log(err);
        console.log(`MongoDB Connection Failed`);
    } else {
        console.log(`MongoDB Connected`);
    }
});


let generateReview = (ProductID, CustomerId, CustomerName, CustomerUrl) => {
    return {
        ProductID: ProductID,
        CustomerId: CustomerId,
        CustomerName: CustomerName,
        CustomerUrl: CustomerUrl,
        Vote: faker.random.number() % 31,
        ReviewText: faker.lorem.paragraph(),
    }
}

let getReviews  = (products, customers) =>{
    var reviews = [];
    var product_offset = 0;
    for(var i=0; i< customers.length; i++){
        var index = (product_offset *100);
        for(var j=0; j<100; j++){
            var p_i = (index + j)% products.length;
            reviews.push(generateReview(products[p_i].ProductID, customers[i].CustomerId, customers[i].CustomerName, customers[i].CustomerUrl));
        }
        product_offset++;
    }
    return reviews;
}

let updateCustomer = (CustomerId, ReviewId) => {
    return new Promise(function (resolve, reject) {
        Customer.update({ _id: CustomerId },{ $push: { CommentsRef: ReviewId } }).then((res)=>{resolve(res)},(err)=>{reject(err)});
    });
}

let updateProduct = (ProductID, ReviewId) => {
    return new Promise(function (resolve, reject) {
        Product.update({ _id: ProductID },{ $push: { Reviews: ReviewId} }).then((res)=>{resolve(res)},(err)=>{reject(err)});
    });
}


let reviewPromises = (reviews) => {
    return Promise.all(reviews.map(function (review) {
        // console.log("employer",JSON.stringify(employer));
        return new Promise(function (resolve, reject) {
            var newReview = new Review(review);
            newReview.save((err, reviewData) => {
                if (err) {
                    reject(err)
                }
                else {
                    // console.log("Product  Added", JSON.stringify(ProductData));
                    Promise.all(
                       [updateCustomer(review.CustomerId, reviewData._id), updateProduct(review.ProductID, reviewData._id)]
                    ).then((res) =>{resolve(res)}, (err) =>{reject(err)});
                }
            });
        });
    }));
}
let generateReviews = () => {

    customers = []
    products = []

    return new Promise(function (resolve, reject) {
        Product.find().then((productData) => {
            productData.map((product) => {
                products.push({
                    "ProductID": product._id,
                });
            });
            console.log("Total Products: ", products.length);
            Customer.find().then((customerData) => {
                customerData.map((customer) => {
                    customers.push({
                        "CustomerId": customer._id,
                        "CustomerName": customer.Name,
                        "CustomerUrl": customer.ProfileURL,
                    });
                });
                console.log("Total Customers: ", customers.length);
                var reviews = getReviews(products, customers);
                // console.log("Reviews: ",JSON.stringify(reviews));
                reviewPromises(reviews).then((res)=>{resolve(res)}, (err)=>{reject(err)});

            }, (err) => {
                console.log("Error in Fetching Products", err);
                reject(err)
            });
        }, (err) => {
            console.log("Error in Fetching Products", err);
            reject(err)
        });

    })

}

generateReviews().then((reviews) => {
    console.log("Review added: ", reviews.length);
}).catch((err)=>{
    console.log(err);
});
