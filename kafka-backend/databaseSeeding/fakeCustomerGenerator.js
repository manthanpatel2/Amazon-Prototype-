var faker = require('faker');
var fs = require('fs');
var bcrypt = require("bcrypt");
var creditCard = require('./fakeCreditCardGenerator');
const mongoose = require('mongoose');
const { mongoDB } = require('../config');
var Customer = require('../models/customerModel');
var Product = require('../models/productModel');

var CUSTOMERS_SIZE = 100;

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

var creditCardTypes = ["Discover", "Amex", "MasterCard", "VISA"]
var products = [];


let generatePayment = () => {
    var creditCardType = faker.random.number() % creditCardTypes.length;
    return {
        Number: creditCard.GenCC(creditCardType)[0],
        NameOnCard: faker.name.findName(),
        ExpDate: faker.date.future(),
    }
}

let generatePayments = () => {
    var payments = [];
    var size = faker.random.number() % 5 + 1;
    var i = 0;
    for (i = 0; i < size; i++) {
        payments.push(generatePayment())
    }
    return payments;
}


let generateAddress = () => {
    return {
        Street: faker.address.streetName(),
        Apt: faker.address.streetAddress(),
        City: faker.address.city(),
        State: faker.address.state(),
        Zipcode: faker.address.zipCode(),
        Country: faker.address.county(),
    };
};

let generateAddresses = () => {
    var addresses = [];
    var size = faker.random.number() % 5 + 1;
    var i = 0;
    for (i = 0; i < size; i++) {
        addresses.push(generateAddress())
    }
    return addresses;
}

let getPasswordForCustomer = () => {
    var password ="Cc123456";
    // return password;
    return bcrypt.hashSync(password, 10);
}


let generateCartAndSaveForLater = () => {
    var index = (faker.random.number() % (products.length - 10));
    var cart = [];
    var saveForLater = [];
    for (var i = 0; i < 5; i++) {
        var isGift = faker.random.boolean();
        var message = null;
        if (isGift) {
            message = faker.lorem.sentences();
        }
        // console.log("index: ",index)
        // console.log("Product: ",JSON.stringify(products[i + index]));
        cart.push({
            ProductID: products[i + index].id,
            Quantity: faker.random.number() % 10 + 1,
            Price: products[i + index].Price,
            IsGift: isGift,
            GiftMessage: message,
        });
    }
    for (var i = 5; i < 10; i++) {
        var isGift = faker.random.boolean();
        var message = null;
        if (isGift) {
            message = faker.lorem.sentences();
        }
        // console.log("index: ",index)
        // console.log("Product: ",JSON.stringify(products[i + index]));
        saveForLater.push({
            ProductID: products[i + index].id,
            Quantity: faker.random.number() % 10 + 1,
            Price: products[i + index].Price,
            IsGift: isGift,
            GiftMessage: message,
        });
    }
    return {
        cart, saveForLater
    }
}


let generateCustomer = () => {
    var name = faker.name.firstName() + " "+ faker.name.lastName();
    var password = getPasswordForCustomer();
    var cartAndSaveForLater = generateCartAndSaveForLater();
    // console.log("Save for Later: ",JSON.stringify(cartAndSaveForLater));
    return {
        Name: name,
        Email: faker.internet.email(),
        Password: password,
        ProfileURL: faker.image.avatar(),
        Address: generateAddresses(),
        Payments: generatePayments(),
        Cart: cartAndSaveForLater.cart,
        SaveForLater: cartAndSaveForLater.saveForLater,
        CommentsRef: [],
    };
};

let generateCustomers = () => {

    customers = []

    return new Promise(function (resolve, reject) {
        Product.find().then((productData) => {
            productData.map((product) => {
                products.push({
                    "id": product._id,
                    "Price": product.Price
                });
            });
            console.log("Total Products: ", products.length);

            for (var i = 0; i < CUSTOMERS_SIZE; i++) {
                customers.push(generateCustomer());
            }
            customerPromises(customers).then((customerData) => {
                resolve(customerData);
            },(err) => {
                reject(err);
            })

        }, (err) => {
            console.log("Error in Fetching Products", err);
            reject(err)
        });

    })

}


var customerPromises = (customers) => {

    return Promise.all(customers.map(function (customer) {
        // console.log("employer",JSON.stringify(employer));
        return new Promise(function (resolve, reject) {
            var newCustomer = new Customer(customer);
            newCustomer.save((err, CustomerData) => {
                if (err) {
                    reject(err)
                }
                else {
                    // console.log("Product  Added", JSON.stringify(ProductData));
                    resolve(CustomerData);
                }
            });
        });
    }));
}


generateCustomers().then((customers) => {
    console.log("Customers added: ", customers.length);
});