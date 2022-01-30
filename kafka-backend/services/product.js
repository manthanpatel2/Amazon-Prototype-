const Product = require('../models/productModel');
const Seller = require('../models/sellerModel');
const Customer = require("../models/customerModel");
const Category = require("../models/categoryModel");
var mysql = require("../models/mysql");

exports.serve = function serve(msg, callback) {
    // console.log("msg", msg);
    // console.log("In Service path:", msg.path);
    switch (msg.path) {
        case "add_product":
            add_product(msg.body, callback);
            break;
        case "get_all_product":
            get_all_product(msg.body, callback)
            break;
        case "add_seller_product":
            add_seller_product(msg, callback)
            break;
        case "update_seller_product":
            update_seller_product(msg.body.req, callback)
            break;
        case "delete_seller_product":
            delete_seller_product(msg.body, callback)
            break;
        case "update_rating":
            update_rating(msg.body, callback)
            break;
        case "get_customer_orders":
            get_customer_orders(msg.body, callback);
            break;
        case "get_seller_orders":
            get_seller_orders(msg.body, callback);
            break;
        case "place_order":
            place_order(msg.body, callback);
            break;
        case "update_order":
            update_order(msg.body, callback);
            break;
        case "particular_product":
            particular_product(msg.body, callback);
            break;
        case "add_category":
            add_category(msg.body, callback);
            break;
        case "remove_category":
            remove_category(msg.body, callback);
            break;
        case "get_category_products":
            get_category_products(msg.body, callback);
            break;
        case "list_of_orders":
            list_of_orders(msg.body, callback);
            break;
        case "change_status":
            changeStatus(msg.body, callback);
            break;
        case "get_category":
            get_category(msg, callback);
            break;

    }
}

function get_category(msg, callback) {
    Category.find({}, (err, result) => {
        if (err) {
            console.log("error ", err);
            callback(err, null);
        } else {
            callback(null, result);
        }
    })
}
function get_category_products(msg, callback) {
    Product.find({ Categories: msg.Category }, { "Seller.Name": 1, Price: 1 }, (err, products) => {
        if (err) {
            console.log("error ", err);
            callback(err, null);
        } else {
            callback(null, products);
        }
    })
}

function add_category(msg, callback) {
    Category.findOne({}, (err, category) => {
        if (err) {
            console.log("error ", err);
            callback(err, null);
        } else {
            console.log("category", category);
            if (category.length === 0) {
                let newCategory = new Category({
                    Categories: [msg.Category]
                })
                newCategory.save(() => { callback(null, true) });
            } else {
                let flag = true;
                category.Categories.forEach((row, i) => {
                    if (row === msg.Category) {
                        console.log("cant add");
                        flag = false;
                        callback(err, null);
                    } else if (i === category.Categories.length - 1 && flag === true) {
                        console.log("adding category")
                        category.Categories.push(msg.Category);
                        category.save(() => { callback(null, true) });
                    }
                })
            }
        }
    })
}

function remove_category(msg, callback) {
    Product.find({ Categories: msg.Category }, (err, products) => {
        if (err) {
            console.log("error ", err);
            callback(err, null);
        } else {
            console.log("products: ", products.length);
            if (products.length === 0) {
                Category.findOne({}, (err, category) => {
                    if (err) {
                        console.log("error ", err);
                        callback(err, null);
                    } else {
                        console.log("category", category);
                        category.Categories.splice(category.Categories.indexOf(msg.Category), 1);
                        category.save(() => { callback(null, { message: "Successfully Deleted" }) })
                    }
                })
            } else {
                callback(null, { message: "Category can not be deleted." })
            }
        }
    })

}

function get_customer_orders(msg, callback) {
    console.log("msg", msg)
    let query = "select * from `Order` where Tracking_status !='Delivered' and Tracking_Status!='Cancel' and CustomerID = '" + msg.CustomerID + "' ORDER BY Order_id DESC";
    mysql.executeQuery(query, function (err, result) {
        if (err) {
            console.log("error ", err);
            callback(err, null);
        } else {
            console.log("orders ", result)
            let query = "select * from `Order` where Tracking_status='Delivered' and CustomerID = '" + msg.CustomerID + "' ORDER BY Order_id DESC";
            mysql.executeQuery(query, function (err, result1) {
                if (err) {
                    console.log("error ", err);
                    callback(err, null);
                } else {
                    console.log("orders ", result)
                    let query = "select * from `Order` where Tracking_Status='Cancel' and CustomerID = '" + msg.CustomerID + "' ORDER BY Order_id DESC";
                    mysql.executeQuery(query, function (err, result2) {
                        if (err) {
                            console.log("error ", err);
                            callback(err, null);
                        } else {
                            console.log("orders ", result)
                            callback(null, { OpenOrders: result, DeliveredOrders: result1, CancelledOrders: result2 });
                        }
                    })
                }
            })
        }
    })
}

function get_seller_orders(msg, callback) {
    console.log("msg", msg)
    let query = "select * from `Order` where Tracking_status !='Delivered' and Tracking_Status!='Cancel' and SellerID = '" + msg.SellerID + "' Order by OrderDate DESC";
    mysql.executeQuery(query, function (err, result) {
        if (err) {
            console.log("error ", err);
            callback(err, null);
        } else {
            console.log("orders ", result)
            let query = "select * from `Order` where Tracking_status='Delivered' and SellerID = '" + msg.SellerID + "' ORDER BY Order_id DESC";
            mysql.executeQuery(query, function (err, result1) {
                if (err) {
                    console.log("error ", err);
                    callback(err, null);
                } else {
                    console.log("orders ", result)
                    let query = "select * from `Order` where Tracking_Status='Cancel' and SellerID = '" + msg.SellerID + "' ORDER BY Order_id DESC";
                    mysql.executeQuery(query, function (err, result2) {
                        if (err) {
                            console.log("error ", err);
                            callback(err, null);
                        } else {
                            console.log("orders ", result)
                            callback(null, { OpenOrders: result, DeliveredOrders: result1, CancelledOrders: result2 });
                        }
                    })
                }
            })
        }
    })
}

function update_order(msg, callback) {
    let query = "select Tracking_Status from `Order` where Order_id=" + msg.OrderID + "";
    mysql.executeQuery(query, function (err, result) {
        if (err) {
            console.log("error ", err);
            callback(err, null);
        } else {
            console.log("res", result[0].Tracking_Status)
            if (result[0].Tracking_Status === "Delivered") {
                callback(null, { message: "Order Cannot Be Cancelled As Already Delivered" });
            }
            else {
                let query = "update `Order` set Tracking_Status = '" + msg.status + "' where Order_id = '" + msg.OrderID + "'";
                mysql.executeQuery(query, function (err, result) {
                    if (err) {
                        console.log("error ", err);
                        callback(err, null);
                    } else {
                        callback(null, { value: "Updated Successfully" });
                    }
                })

            }
        }
    })
}

function place_order(msg, callback) {
    // console.log(msg);
    Customer.findById({ _id: msg.CustomerID }, (err, customer) => {
        if (err) {
            console.log("error ", err);
            callback(err, null);
        } else {
            let date = new Date().toISOString().slice(0, 19).replace('T', ' ');
            console.log("date: ", date);
            customer.Cart.forEach(async (product, i) => {
                // console.log(i, " ", product);
                await Product.find({ _id: product.ProductID }, (err, result) => {
                    console.log("Seller ", result);
                    console.log("Name---------------", result);
                    let query = "insert into `Order`(ProductID, CustomerID, SellerID, Price, Qty, Tracking_Status, IsGift,GiftMessage, CardNumber, CardName, Address, OrderDate, SellerName, ProductName) VALUES('" + product.ProductID + "', '" + msg.CustomerID + "','" + result[0].Seller.SellerId + "','" + Number(product.Price) * Number(product.Quantity) + "','" + product.Quantity + "','Accepted', '" + product.IsGift + "','" + product.GiftMessage + "','" + msg.CardNumber + "','" + msg.CardName + "','" + msg.Address + "','" + date + "','" + result[0].Seller.Name + "','" + result[0].Name + "') ";

                    mysql.con.query(query, function (err, result) {
                        if (err) {
                            console.log("error ", err);
                            callback(err, null);
                        } else {
                            console.log("orders ", result)
                            if (i === customer.Cart.length - 1) cb();
                        }
                    })
                })
            })
            function cb() {
                Customer.updateOne({ _id: msg.CustomerID }, { $set: { Cart: [] } }).exec().then(result => {
                    console.log("Inside deleting cart")
                    callback(null, { success: true })
                })
            }

        }
    })

}
function update_rating(msg, callback) {

    Product.findById({ _id: msg.id }, (err, product) => {
        if (err) {
            console.log("rating update error", err);
            callback(err, null);
        } else {
            if (product.Count === undefined) {
                product.Count = 0
                product.save(() => { console.log("Updated") })
                product.Count = product.Count + 1
                console.log('Count', product.Count)
                product.Rating = (msg.Rating + (product.Rating * (product.Count - 1))) / (product.Count);
                console.log(" Rating ", product.Rating)
                product.save(() => { callback(null, { rating: product.Rating }) })
            }
            else {
                product.Count = product.Count + 1
                console.log('Count', product.Count)
                product.Rating = (msg.Rating + (product.Rating * (product.Count - 1))) / (product.Count);
                console.log(" Rating ", product.Rating)
                product.save(() => { callback(null, { rating: product.Rating }) })
            }

        }
    })
}

function add_seller_product(msg, callback) {
    const product = new Product({
        Name: msg.body.Name,
        Images: msg.body.Images,
        Rating: 0,
        Offers: msg.body.Offers,
        Price: msg.body.Price,
        Description: msg.body.Description,
        Categories: msg.body.Categories,
        Count: 0,
        Reviews: [],
        Seller: {
            SellerId: msg.body.SellerId,
            Name: msg.body.SellerName,
        }
    });
    product
        .save()
        .then(result => {
            Seller.update({ "_id": msg.body.SellerId }, { $push: { "Products": result._id } }).then((res) => {
                console.log("res in adding product: ", JSON.stringify(res));
                callback(null, result);
            }).catch((err) => {
                console.log("Erro in adding product: ", err)
                callback(err, null);
            });

        })
        .catch(err => {
            console.log("Erro in adding product: ", err)
            callback(err, null);
        })
}

function update_seller_product(msg, callback) {
    Product.updateOne({ _id: msg._id },
        {
            $set: {
                Name: msg.Name,
                // Rating: msg.Rating,
                Offers: msg.Offers,
                Price: msg.Price,
                Description: msg.Description,
                Categories: msg.Categories
            }
        }, { new: true }).exec()
        .then(result => {
            console.log("----------------------------update_seller_product result", result)
            callback(null, { value: true })
        })
        .catch(err => {
            console.log("update_seller_product ERROR : " + err)
        })
}

function delete_seller_product(msg, callback) {
    Product.deleteOne({ _id: msg._id }, { new: true }).exec()
        .then(result => {
            console.log("result", result)
            callback(null, { value: true })
        })
        .catch(err => {
            console.log("ERROR : " + err)
            callback(err, null)
        })
}


function get_all_product(msg, callback) {
    let condition = {}
    if (msg.SellerId) {
        console.log("inside if");
        condition = { Name: { $regex: '.*' + msg.name + '.*' }, "Seller.SellerId": msg.SellerId }
        if (msg.Categories) {
            if (msg.Categories.length !== 0) condition.Categories = { $all: msg.Categories }
        }
        console.log("condition: ", condition)
        const options = {
            page: msg.page,
            limit: msg.limit,
            // Sorting will be implemented here...
            sort: msg.sort
        };
        Product.paginate(condition, options, function (err, result) {

            if (err) {
                callback(err, null);
            }
            else {
                callback(null, result);
            }
        });
    }
    else {
        console.log("inside ELSE");
        console.log("msg", msg)
        condition = { $or: [{ Name: { $regex: '.*' + msg.name + '.*' } }, { "Seller.Name": { $regex: '.*' + msg.name + '.*' } }] }
        if (msg.Categories) {
            if (msg.Categories.length !== 0) {
                condition = {
                    $or: [{ "Seller.Name": { $regex: '.*' + msg.name + '.*' } }, { Name: { $regex: '.*' + msg.name + '.*' } }], Categories: { $all: msg.Categories }
                }
            }
        }
        const options = {
            page: msg.page,
            limit: msg.limit,
            populate: 'Seller.SellerId',
            // Sorting will be implemented here...
            sort: msg.sort
        };
        console.log("condition: ", condition);
        Product.paginate(condition, options, function (err, result) {
            if (err) {
                callback(err, null);
            }
            else {
                callback(null, result);
            }
        });
    }

}


function particular_product(msg, callback) {
    Product.find({ _id: msg.id }).exec()
        .then(result => {
            console.log("result", result)
            callback(null, result[0])
        })
        .catch(err => {
            console.log("ERROR : " + err)
            callback(err, null)
        })
}

function list_of_orders(msg, callback) {
    if (msg.name) {
        let query = "select * from `Order` where SellerName LIKE '%" + msg.name + "%'";
        mysql.executeQuery(query, function (err, result) {
            if (err) {
                console.log("error ", err);
                callback(err, null);
            } else {
                callback(null, result);
            }
        })
    }
    else if (msg.status) {
        let query = "select * from `Order` where Tracking_Status = '" + msg.status + "'";
        mysql.executeQuery(query, function (err, result) {
            if (err) {
                console.log("error ", err);
                callback(err, null);
            } else {
                callback(null, result);
            }
        })
    }
    else {
        let query = "select * from `Order`";
        mysql.executeQuery(query, function (err, result) {
            if (err) {
                console.log("error ", err);
                callback(err, null);
            } else {
                callback(null, result);
            }
        })
    }

}

function changeStatus(msg, callback) {
    let query = "update `Order` set Tracking_Status = '" + msg.status + "' where Order_id = '" + msg.Order_id + "'";
    mysql.executeQuery(query, function (err, result) {
        if (err) {
            console.log("error ", err);
            callback(err, null);
        } else {
            callback(null, { value: "Updated Successfully" });
        }
    })

}
