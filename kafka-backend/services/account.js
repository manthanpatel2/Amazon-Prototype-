const Customer = require('../models/customerModel');
const Seller = require("../models/sellerModel");
const Admin = require("../models/adminModel");
const bcrypt = require('bcrypt');
const saltRounds = 10;
const salt = bcrypt.genSaltSync(saltRounds);


exports.serve = function serve(msg, callback) {
    // console.log('inside kafka backend login service');
    console.log("msg", msg);
    // console.log("In Service path:", msg.path);
    switch (msg.path) {
        case "login":
            login(msg, callback);
            break;
        case "signup":
            signup(msg, callback);
            break;
        case "customer_payment":
            customer_payment(msg, callback);
            break;
        case "get_cart":
            get_cart(msg, callback);
            break;
        case "update_cart":
            update_cart(msg, callback)
            break;
        case "addCard":
            addCard(msg.body,callback)
    }
}
function addCard(msg, callback) {
    console.log("@@@@"+msg)
    var res = {};
    Customer.findOneAndUpdate({ _id: msg.id },
      {
        $push: {
            Payments : {
            Number : msg.Number,
            NameOnCard : msg.NameOnCard,
            ExpDate : new Date(+new Date() +  180* 24 * 60 * 60 * 1000) 
          }
        }
      },
      function (err, user) {
        if (err) {
          res.code = "400";
          res.value =
            "The user is not valid";
          console.log(res.value);
          callback(null, null);
          //res.sendStatus(400).end();
        } else {
          res.code = "200";
          res.value = "Card Added Successful"
          console.log("Card Added Successful");
          callback(null, res);
          //res.sendStatus(200).end();
        }
      }
    );
  }
  
function get_cart(msg, callback) {

    Customer.findOne({ "_id": msg.body.id }).populate("Cart.ProductID").populate("SaveForLater.ProductID").exec()
        .then(result => {
            console.log("result", result)
            callback(null, { value: result })
        })
        .catch(err => {
            console.log("ERROR : " + err)
        })
}

function update_cart(msg, callback) {

    Customer.findOneAndUpdate({ "_id": msg.body.id },
        {
            $set: {
                Cart: msg.body.Cart,
                SaveForLater: msg.body.SaveForLater
            }
        }, { new: true }).exec()
        .then(result => {
            console.log("result", result)
            callback(null, { value: true })
        })
        .catch(err => {
            console.log("ERROR : " + err)
        })
}
function customer_payment(msg, callback) {
    Customer.findOne({ _id: msg.body.id }).populate('Cart.ProductID')
        .exec((err, customer) => {
            if (err) {
                console.log('Customer Payment error', err)
                callback(null, { message: "Please try again" })
            }
            if (customer) {
                console.log("customer payment details")
                callback(null, { Payments: customer.Payments, Address: customer.Address, Cart: customer.Cart })
            }
        })
}

function login(msg, callback) {
    let password = msg.body.password;
    console.log("inside login function")
    switch (msg.body.role) {
        case "Customer":
            Customer.findOne({ Email: msg.body.email })
                .then(customer => {
                    console.log("inside callback")
                    if (customer) {
                        console.log("customer found-", customer)
                        if (bcrypt.compareSync(password, customer.Password)) {
                            console.log('customer match')
                            callback(null, {
                                signInSuccess: true,
                                id: customer._id,
                                name: customer.Name,
                                message: "successful login",
                                role: "customer",
                                profileUrl: customer.ProfileURL,
                            })
                        }
                        else {
                            console.log('wrong password')
                            callback(null, { signInSuccess: false, message: "Wrong password" })
                        }
                    }
                    else {
                        console.log('wrong email')
                        callback(null, { signInSuccess: false, message: "Wrong email" })
                    }
                })
                .catch(error => {
                    console.log('customer login error', error)
                    callback(null, { signInSuccess: false, message: "Please try again" })
                })
            break;
        case "Seller":
            Seller.findOne({ Email: msg.body.email })
                .then(seller => {
                    if (seller) {
                        console.log("seller found-", seller)
                        if (bcrypt.compareSync(password, seller.Password)) {
                            console.log('seller match')
                            callback(null, { signInSuccess: true, id: seller._id, name: seller.Name, message: "successful login", role: "seller" })
                        }
                        else {
                            console.log('wrong password')
                            callback(null, { signInSuccess: false, message: "Wrong password" })
                        }
                    }
                    else {
                        console.log('wrong email')
                        callback(null, { signInSuccess: false, message: "Wrong email" })
                    }
                })
                .catch(error => {
                    console.log('seller login error', error)
                    callback(null, { signInSuccess: false, message: "Please try again" })
                })
            break;
        case "Admin":
            Admin.findOne({ Email: msg.body.email })
                .then(admin => {
                    if (admin) {
                        console.log("admin found-", admin)
                        if (bcrypt.compareSync(password, admin.Password)) {
                            console.log('admin match')
                            callback(null, { signInSuccess: true, id: admin._id, name: admin.Name, message: "successful login", role: "admin" })
                        }
                        else {
                            console.log('wrong password')
                            callback(null, { signInSuccess: false, message: "Wrong password" })
                        }
                    }
                    else {
                        console.log('wrong email')
                        callback(null, { signInSuccess: false, message: "Wrong email" })
                    }
                }) 
                .catch(error => {
                    console.log('admin login error', error)
                    callback(null, { signInSuccess: false, message: "Please try again" })
                })
            break;

    }
}
function signup(msg, callback) {
    switch (msg.body.role) {
        case "Customer":
            Customer.findOne({ Email: msg.body.email, Name: msg.body.name }, (err, customer) => {
                if (err) {
                    console.log('customer signup error', err)
                    callback(null, { signInSuccess: false, message: "Please try again" })
                }
                if (customer) {
                    console.log("customer already exists")
                    callback(null, { signInSuccess: false, message: "Customer already exists" })
                } else {
                    console.log("about to signup")
                    let hash = bcrypt.hashSync(msg.body.password, salt);
                    let newCustomer = new Customer({
                        Name: msg.body.name, Email: msg.body.email, Password: hash
                    })
                    newCustomer.save(() => { callback(null, { signInSuccess: true, id: newCustomer._id, name: newCustomer.Name, message: "Successfully Signed up", role: "customer" }) });
                }
            })
            break;
        case "Seller":
            Seller.findOne({ Email: msg.body.email, Name: msg.body.name }, (err, seller) => {
                if (err) {
                    console.log('seller signup error', err)
                    callback(null, { signInSuccess: false, message: "Please try again" })
                }
                if (seller) {
                    console.log("seller already exists")
                    callback(null, { signInSuccess: false, message: "Seller already exists" })
                } else {
                    console.log("about to signup")
                    let hash = bcrypt.hashSync(msg.body.password, salt);
                    let newSeller = new Seller({
                        Name: msg.body.name, Email: msg.body.email, Password: hash
                    })
                    newSeller.save(() => { callback(null, { signInSuccess: true, id: newSeller._id, name: newSeller.Name, message: "Successfully Signed up", role: "seller" }) });
                }
            })
            break;
        case "Admin":
            Admin.findOne({ Email: msg.body.email, Name: msg.body.name }, (err, admin) => {
                if (err) {
                    console.log('admin signup error', err)
                    callback(null, { signInSuccess: false, message: "Please try again" })
                }
                if (admin) {
                    console.log("admin already exists")
                    callback(null, { signInSuccess: false, message: "Admin already exists" })
                } else {
                    console.log("about to signup")
                    let hash = bcrypt.hashSync(msg.body.password, salt);
                    let newAdmin = new Admin({
                        Name: msg.body.name, Email: msg.body.email, Password: hash
                    })
                    newAdmin.save(() => { callback(null, { signInSuccess: true, id: newAdmin._id, name: newAdmin.Name, message: "Successfully Signed up", role: "admin" }) });
                }
            })
            break;
    }

}


