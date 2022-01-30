var express = require("express");
var app = express();
var bodyParser = require("body-parser");
const redis = require("redis");
const { frontendURL } = require("./src/utils/config");
var { mongoDB } = require('./config');
var mongoose = require("mongoose");
var cors = require("cors");

var options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    poolSize: 500,
    bufferMaxEntries: 0
};
mongoose.connect(mongoDB, options, (err) => {
    if (err) {
        console.log("MONGODB connection error", err);
        console.log(`MongoDB Connection Failed`);
    } else {
        console.log(`MongoDB Connected`);
    }
});

app.use(cors({ origin: frontendURL, credentials: true }));

// app.use(bodyParser.urlencoded({
//     extended: true
// }));

const redisClient = redis.createClient(6379);

redisClient.on("error", (err) => {
    console.log(err)
});

app.use(bodyParser.json());

app.use(function (req, res, next) {
    res.setHeader("Access-Control-Allow-Origin", frontendURL);
    res.setHeader("Access-Control-Allow-Credentials", "true");
    res.setHeader(
        "Access-Control-Allow-Methods",
        "GET,HEAD,OPTIONS,POST,PUT,DELETE"
    );
    res.setHeader(
        "Access-Control-Allow-Headers",
        "Access-Control-Allow-Headers, Origin, Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers"
    );
    res.setHeader("Cache-Control", "no-cache");
    next();
});

const customerAccount = require("./src/routes/customer/account");
// const sellerAccount = require("./src/routes/seller/account");
// const adminAccount = require("./src/routes/admin/account");

const customerProfile = require("./src/routes/customer/profile");
const customerPayment = require("./src/routes/customer/payment")
const customerProduct = require("./src/routes/customer/product");
const customerReview = require("./src/routes/customer/review");
const sellerProduct = require("./src/routes/seller/sellerProduct");
const orders = require("./src/routes/customer/orders");
const adminAnalytics = require("./src/routes/admin/analytics");
const adminSideSeller = require("./src/routes/admin/sellerData");
const category = require("./src/routes/admin/category");
const adminSideOrder = require("./src/routes/admin/orders");
const sellerProfile = require("./src/routes/seller/sellerprofile");

app.use("/customer", customerAccount);
app.use("/customer/product", customerProduct);
app.use("/customer/review", customerReview);
app.use("/seller/product", sellerProduct)
app.use("/orders", orders);

app.use("/customer/profile", customerProfile);
app.use("/seller/profile", sellerProfile);
app.use("/admin/analytics", adminAnalytics);
app.use("/admin/seller", adminSideSeller);
app.use("/admin/orders", adminSideOrder);
app.use("/seller/profile", sellerProfile);
app.use("/admin/category", category);
app.use("/customer/payment", customerPayment)

app.listen(3001);
console.log("Server Listening on port 3001");