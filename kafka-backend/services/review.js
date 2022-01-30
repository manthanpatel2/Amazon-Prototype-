const Review = require('../models/reviewModel');
const Product = require('../models/productModel')
const Customer = require('../models/customerModel')

exports.serve = function serve(msg, callback) {
    console.log("msg", msg);
    // console.log("In Service path:", msg.path);
    switch (msg.path) {
        case "add_review":
            add_review(msg.body.req, callback);
            break;
        case "get_reviews_product":
            get_reviews_product(msg.body, callback)
            break;
        case "get_reviews_customer" :
            get_reviews_customer(msg.body, callback)
    }
}

function add_review(msg, callback) {
    const review = new Review({
        ProductID: msg.ProductID,
        CustomerId: msg.CustomerId,
        CustomerName: msg.CustomerName,
        CustomerUrl: msg.CustomerUrl,
        Vote: msg.Vote,
        ReviewText: msg.ReviewText
    });
    review.save()
    .then(result=>{
        console.log("Result Add Review",result)
        Product.updateOne({_id : msg.ProductID},{
            $push : {
                Reviews : result._id
            }
        },(err, product)=> {
            Customer.updateOne({_id : msg.CustomerId},{
                $push : {
                    CommentsRef : result._id
                }
            },(err, customer)=>{
                callback(null ,{ Result : result, Product : product, Customer : customer})
            })
        })
        
    })
    .catch(err=>{
        console.log('Error Add Review', err)
        callback(err,null)
    })
}


function get_reviews_product(msg, callback){
    // console.log("In Get Students kafka backend");
    // console.log("msg: ",JSON.stringify(msg));
    Review.find({ProductID: msg.ProductID},function (err, result) {
        if (err) {
            // console.log("Error: ",err);
            callback(err, null);
        }
        else {
            // console.log("Products found");
            callback(null, result);
        }
    });
}

function get_reviews_customer(msg, callback){
    // console.log("In Get Students kafka backend");
    // console.log("msg: ",JSON.stringify(msg));
    Review.find({CustomerId: msg.CustomerID},function (err, result) {
        if (err) {
            // console.log("Error: ",err);
            callback(err, null);
        }
        else {
            // console.log("Products found");
            callback(null, result);
        }
    });
}
