const express = require("express");
const router = express.Router();
const kafka = require("../../../kafka/client");
// const Product = require('../../models/productModel');
const redis = require("redis");
const redisClient = redis.createClient(6379);
const { auth } = require("../../utils/passport");
const { checkAllAuth, checkCustomerAuth } = require("../../utils/passport");
auth();

redisClient.on("error", (err) => {
    console.log(err)
});

router.post("/products", function (req, res) {
    const data = {
        page: req.body.page,
        limit: req.body.limit,
        name: req.body.name,
        Categories: req.body.Categories,
        SellerId: req.body.SellerId,
        sort: req.body.sort,
    }

    // console.log("Data: ", JSON.stringify(data));
    // if (parseInt(data.page) < 6) {

    //     let redisKey = "pg_" + data.page
    //     redisClient.get(redisKey, (err, result) => {
    //         if (result) {
    //             console.log("@@@@@@@@@@\nCALLED FROM CACHE MEMORY")
    //             res.status(200);
    //             res.json(JSON.parse(result))
    //             res.end();
    //             return;
    //         }
    //         else {
    //             kafka.make_request('product', { "path": "get_all_product", "body": data }, function (err, result) {
    //                 if (!result) {
    //                     console.log("Inside err");
    //                     res.status(404);
    //                     res.json({
    //                         status: "error",
    //                         msg: "Products not found",
    //                     })
    //                     res.end();
    //                     return;
    //                 } else {
    //                     console.log("Inside data");
    //                     // console.log("Data:", JSON.stringify(results));
    //                     res.status(200);
    //                     res.json(result)
    //                     res.end();
    //                     redisClient.setex(redisKey, 3600, JSON.stringify(result))
    //                     return;
    //                 }
    //             });
    //         }
    //     })

    // }
    // else {
    kafka.make_request('product', { "path": "get_all_product", "body": data }, function (err, result) {
        if (!result) {
            console.log("Inside err");
            res.status(404);
            res.json({
                status: "error",
                msg: "Products not found",
            })
            res.end();
            return;
        } else {
            console.log("Inside data");
            // console.log("Data:", JSON.stringify(results));
            res.status(200);
            res.json(result)
            res.end();
            return;
        }
    });
    // }
})

router.post("/updateRating", function (req, res) {
    const data = {
        id: req.body.id,
        Rating: req.body.Rating
    }
    console.log("updateRating: ", JSON.stringify(data));
    kafka.make_request('product', { "path": "update_rating", "body": data }, function (err, result) {
        if (!result) {
            console.log("Inside err");
            res.status(404);
            res.json({
                status: "error",
                msg: "Ratings not found",
            })
            res.end();
        } else {
            console.log("Inside Edit Rating data");
            // console.log("Data:", JSON.stringify(results));
            res.status(200);
            res.json(result)
            res.end();
            return;
        }
    });
});

router.post("/particularProduct", function (req, res) {
    const data = {
        id: req.body.id
    }
    // console.log("Data: ",JSON.stringify(data));
    kafka.make_request('product', { "path": "particular_product", "body": data }, function (err, result) {
        if (!result) {
            console.log("Inside err");
            res.status(404);
            res.json({
                status: "error",
                msg: "Product not found",
            })
            res.end();
        } else {
            console.log("Inside Product data");
            // console.log("Data:", JSON.stringify(results));
            res.status(200);
            res.json(result)
            res.end();
            return;
        }
    });
});


module.exports = router;