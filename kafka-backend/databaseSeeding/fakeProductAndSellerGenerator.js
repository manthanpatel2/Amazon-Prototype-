var faker = require('faker');
var fs = require('fs');
var bcrypt = require("bcrypt");
const mongoose = require('mongoose');
const { mongoDB } = require('../config');
var Product = require('../models/productModel');
var Seller = require('../models/sellerModel');


var SELLER_SIZE = 100;
var PRODUCT_PER_SELLER = 100;


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


var brands = ["airbnb", "amazon", "americanexpress", "apple", "appnet", "automatic", "evernote", "facebook", "github", "glassdoor", "google", "heroku", "houzz", "hulu", "imdb", "instagram"];
var categories = ["Shoes", "Toys", "Outdoors", "Clothing", "Beauty", "Electronics", "Computers", "Home"];

let getCategory = () => {
    var index = faker.random.number() % categories.length;
    return categories[index];
}

let getCategories = () => {
    var categories = [];
    var size = faker.random.number() % 5 + 1;
    var i;
    for (i = 0; i < size; i++) {
        categories.push(getCategory());
    }
    return categories;
}
let getBrand = () => {
    var index = faker.random.number() % brands.length;
    return brands[index];
};


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

let getPasswordForSeller = () => {
    var password = "Ss123456";
    // return password;
    return bcrypt.hashSync(password, 10);
}



let generateSeller = () => {
    var sellerName = faker.company.companyName();
    var password = getPasswordForSeller(sellerName);
    var brand = getBrand();
    return {
        Name: sellerName,
        Email: faker.internet.email(),
        Password: password,
        ProfileURL: "http://satyr.io/80x60/" + (faker.random.number() % 100) + "?brand=" + brand,
        Address: generateAddress(),
        Products: [],
        Description: faker.lorem.paragraph(),
    };
};

let getOffers = () => {
    var size = faker.random.number() % 4;
    var offers = [];
    var i=0;
    for (i=0; i<size; i++){
        offers.push(faker.lorem.sentence())
    }
    return offers;
}

let getProductImages = (categories) => {
    var imgs = [];
    var size = faker.random.number() % 5 + 1;
    var i;
    for (i = 0; i < size; i++) {
        var collection_id = faker.random.number()% 100000;
        imgs.push("https://source.unsplash.com/collection/products"+collection_id);
    }
    return imgs
}


let generateProduct = (sellerId, sellerName, sellerProfileUrl) => {

    var seller = {
        SellerId: sellerId,
        Name: sellerName,
        SellerProfileUrl: sellerProfileUrl,
    }

    var categories = getCategories();
    var imgs = getProductImages(categories);

    return {
        Seller: seller,
        Name: faker.commerce.productName(),
        Images: imgs,
        Rating: faker.random.number() % 6,
        Offers: getOffers(),
        Price: faker.commerce.price(),
        Description: faker.lorem.paragraph(),
        Reviews: [],
        Categories: categories,
    }
};



let getProducts = (sellerId, sellerName, sellerProfileUrl) => {

    var products = []

    var i = 0;
    for (i = 0; i < PRODUCT_PER_SELLER; i++) {
        products.push(generateProduct(sellerId, sellerName, sellerProfileUrl))
    }

    return products;
}

var productPromises = (sellerId, sellerName, sellerProfileUrl) => {

    var products = getProducts(sellerId, sellerName, sellerProfileUrl);

    return Promise.all(products.map(function (product) {
        // console.log("employer",JSON.stringify(employer));
        return new Promise(function (resolve, reject) {
            var newProduct = new Product(product);
            newProduct.save((err, ProductData) => {
                if (err) {
                    reject(err)
                }
                else {
                    // console.log("Product  Added", JSON.stringify(ProductData));
                    resolve(ProductData._id);
                }
            });
        });
    }));
}


var getSellers = () => {
    var sellers = [];
    var i=0;
    for (i=0; i<SELLER_SIZE; i++){
        sellers.push(generateSeller());
    }
    return sellers;
}



var sellerPromises = () => {
    var sellers = getSellers();

    return Promise.all(sellers.map(function (seller) {
        // console.log("seller: ", JSON.stringify(seller));

        return new Promise(function (resolve, reject) {
            var newSeller = new Seller(seller);
            newSeller.save((error, sellerData) => {
                if (error) {
                    reject(error)
                }
                else {
                    // console.log("Seller: ",JSON.stringify(sellerData));
                    var sellerName = sellerData.Name;
                    var sellerId = sellerData._id;
                    var sellerProfileUrl = sellerData.ProfileURL;
                    productPromises(sellerId, sellerName, sellerProfileUrl).then((productIds) => {
                        // console.log("ProductIds: ",JSON.stringify(productIds));
                        Seller.update({"_id":sellerId},{ "Products": productIds}).then((res) =>{
                            // console.log("ProductIds addes", JSON.stringify(res));
                            resolve(res);
                        }, (err) => {
                            // console.log("Error in adding productIDs", err);
                            reject(err);
                        });
                    }, (err) => {
                        // console.log("Error in Adding Products:", err);
                        reject(err);
                    });
                }
            });
        });
    }));
}

sellerPromises().then((res)=>{
    console.log("sellers are added!",res.length);
}).catch( (err) => {
    console.log("Error: ",JSON.stringify(err));
})