var mysql = require("../models/mysql");
const Product = require("../models/productModel");
const Seller = require("../models/sellerModel");
const Customer = require("../models/customerModel");

exports.serve = function serve(msg, callback) {
    // console.log('inside kafka backend login service');
    console.log("msg", msg);
    // console.log("In Service path:", msg.path);
    switch (msg.path) {
        case "most_sold_products":
            most_sold_products(msg.body, callback);
            break;
        case "top_5_sellers":
            top_5_sellers(msg.body, callback);
            break;
        case "top_5_customers":
            top_5_customers(msg, callback);
            break;
        case "top_10_products":
            top_10_products(msg, callback);
            break;
        case "orders_per_day":
            orders_per_day(msg, callback)
            break;
    }
}

function most_sold_products(msg, callback) {
    let query = "SELECT ProductID, COUNT(ProductID) as Orders FROM `Order` GROUP BY ProductID ORDER BY Orders DESC LIMIT 5";

    mysql.executeQuery(query, async function (err, result) {
        if (err) {
            console.log("error ", err);
            callback(err, null);
        } else {
            console.log(result);
            let value = [];
            result.forEach(async (elem, i) => {
                await Product.findById({ _id: elem.ProductID }, (err, product) => {
                    if (product) {
                        value.push({ Name: product.Name, Orders: elem.Orders });
                    }
                    if (i === result.length - 1) {
                        console.log(value)
                        callback(null, value);
                    }
                })
            })
        }
    })
}

function top_5_sellers(msg, callback) {
    let query = " SELECT SellerID, SUM(Price) as Sales FROM `Order` GROUP BY SellerID ORDER BY Sales DESC LIMIT 5";
    mysql.executeQuery(query, function (err, result) {
        if (err) {
            console.log("error ", err);
            callback(err, null);
        } else {
            let value = [];
            result.forEach(async (elem, i) => {
                await Seller.findById({ _id: elem.SellerID }, (err, seller) => {
                    if (seller) {
                        // console.log("seller", seller.Name, " Sales: ", elem.Sales);
                        value.push({ Name: seller.Name, Sales: elem.Sales });
                    }
                    if (i === result.length - 1) {
                        callback(null, value);
                    }
                })
            })
        }
    })
}

function top_5_customers(msg, callback) {
    let query = " SELECT CustomerID, SUM(Price) as Purchase_amount FROM `Order` GROUP BY CustomerID ORDER BY Purchase_amount DESC LIMIT 5";
    mysql.executeQuery(query, function (err, result) {
        if (err) {
            console.log("error ", err);
            callback(err, null);
        } else {
            // console.log(result)
            let value = [];
            result.forEach(async (elem, i) => {
                await Customer.findById({ _id: elem.CustomerID }, (err, customer) => {
                    if (customer) {
                        // console.log("customer", result.Name, " purchase : ", customer.Purchase_amount);
                        value.push({ Name: customer.Name, Purchase_amount: elem.Purchase_amount });
                    }
                    if (i === result.length - 1) {
                        callback(null, value);
                    }
                })
            })
        }
    })
}

function top_10_products(msg, callback) {

    Product.find().limit(10).sort("-Rating").exec((err, result) => {
        if (err) {
            console.log("error ", err);
            callback(err, null);
        } else {
            let value = result.map(product => {
                return ({ Name: product.Name, Rating: product.Rating })
            })
            callback(null, value);
        }
    })
}

//done
async function orders_per_day(msg, callback) {
    let Counts = []
    const promise = new Promise((resolve, reject) => {

        for (let i = 0; i < 7; i++) {
            let date = new Date(+new Date() - i * 24 * 60 * 60 * 1000).toISOString().slice(0, 19).replace('T', ' ');
            date = date.slice(0, 11)
            console.log("Date", date)
            let query = " SELECT COUNT(Order_id) as orders  FROM `Order` where OrderDate LIKE '" + date + "%' ";
            mysql.executeQuery(query, async function (err, result) {
                if (err) {
                    console.log("error ", err);
                    callback(err, null);
                } else {
                    console.log("Orders per day Result", result[0].orders)
                    // callback(null, result);
                    await Counts.push({ "Date": date, "Count": result[0].orders })
                    console.log("Counts", Counts)
                }
            })
        }

        setTimeout(function () {
            resolve("Success!")  // Yay! Everything went well!
        }, 3000)
    })
    promise.then(result => {
        console.log("In promise")
        callback(null, Counts)
    })

}