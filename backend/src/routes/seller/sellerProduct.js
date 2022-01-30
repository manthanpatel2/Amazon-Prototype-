const express = require("express");
const router = express.Router();
const { secret } = require("../../utils/config");
const jwt = require('jsonwebtoken');
const kafka = require("../../../kafka/client");
const multer = require('multer');
const aws = require("aws-sdk");
const multers3 = require("multer-s3");
var path = require('path');
var app = express();
const dotenv = require('dotenv');
dotenv.config();
const { auth } = require("../../utils/passport");
const { checkSellrAuth, checkAllAuth } = require("../../utils/passport");
auth();

const bucket = "ouramazonbucket1";

const s3Bucket = new aws.S3({
    accessKeyId: `${process.env.accessKeyId}`,
    secretAccessKey: `${process.env.secretAccessKey}`
})

const upload = multer({
    storage: multers3({
        s3: s3Bucket,
        bucket: bucket,
        acl: "public-read",
        contentType: multers3.AUTO_CONTENT_TYPE,
        key: function (req, file, callback) {
            console.log("request body", req.body);
            let folder = req.body.Name.toLowerCase().split(' ').join('_');
            console.log("folder- ", folder);
            callback(null, req.body.SellerName + '/' + folder + '/' + Date.now().toString() + path.extname(file.originalname))
        }
    }),
}).array('Images', 5);

router.post("/addProduct", function (req, res) {



    let UpdatedImages = []
    // console.log("req.body", req.data)
    // console.log("req.file", req.file);
    upload(req, res, function (error) {
        if (error instanceof multer.MulterError)
            return res.json({ status: "402", error: error })
        else if (error)
            return res.json({ status: "401", error: error.message })
        else {
            console.log("req.files- ", req.files);

            for (let i = 0; i < req.files.length; i++) {
                UpdatedImages.push(req.files[i].location);
            }
            console.log("updated imgages: ", UpdatedImages);
            // req.body.Images = UpdatedImages

            var product = JSON.parse(req.body.Product);
            const data = {
                Name: product.Name,
                Images: UpdatedImages,
                Offers: [],
                Price: product.Price,
                Description: product.Description,
                Categories: product.Categories,
                SellerId: product.SellerId,
                SellerName: product.SellerName
            }
            console.log("Data: ", JSON.stringify(data));
            kafka.make_request('product', { "path": "add_seller_product", "body": data }, function (err, result) {
                if (!result) {
                    console.log("Inside err");
                    res.status(404);
                    res.json({
                        status: "error",
                        msg: "Products not found",
                    })
                    res.end();
                } else {
                    console.log("Inside data");
                    // console.log("Data:", JSON.stringify(results));
                    res.status(200);
                    res.json(result)
                    res.end();
                    return;
                }
            }); 
        }
    })

});

router.post("/updateProduct", function (req, res) {
    const data = {
        req: req.body
    }
    // console.log("Data: ",JSON.stringify(data));
    kafka.make_request('product', { "path": "update_seller_product", "body": data }, function (err, result) {
        if (!result) {
            console.log("Inside err updateProduct");
            res.status(404);
            res.json({
                status: "error",
                msg: "Products not found",
            })
            res.end();
        } else {
            console.log("Inside result updateProduct ", JSON.stringify(result));
            // console.log("Data:", JSON.stringify(results));
            res.status(200);
            res.json(result)
            res.end();
            return;
        }
    });
});

router.post("/deleteProduct", function (req, res) {
    const data = {
        _id: req.body.product_id
    }
    console.log("deleteProduct: ", JSON.stringify(data));
    kafka.make_request('product', { "path": "delete_seller_product", "body": data }, function (err, result) {
        if (!result) {
            console.log("Inside err");
            res.status(404);
            res.json({
                status: "error",
                msg: "Products not found",
            })
            res.end();
        } else {
            console.log("Inside data");
            // console.log("Data:", JSON.stringify(results));
            res.status(200);
            res.json(result)
            res.end();
            return;
        }
    });
});

module.exports = router;