const express = require("express");
const router = express.Router();
const kafka = require("../../../kafka/client");
const { auth } = require("../../utils/passport");
const { checkCustomerAuth, checkAllAuth } = require("../../utils/passport");
auth();

router.get("/reviews", function (req, res) {
    if (req.query.product_id) {
        const data = {
            ProductID: req.query.product_id,
        }
        // console.log("Data: ",JSON.stringify(data));
        kafka.make_request('review', { "path": "get_reviews_product", "body": data }, function (err, result) {
            if (!result) {
                console.log("Inside err");
                res.status(404);
                res.json({
                    status: "error",
                    msg: "Reviews not found",
                })
                res.end();
            } else {
                console.log("Inside Review data");
                // console.log("Data:", JSON.stringify(results));
                res.status(200);
                res.json(result)
                res.end();
                return;
            }
        });
    }
    else if (req.query.customer_id) {
        const data = {
            CustomerID: req.query.customer_id,
        }
        // console.log("Data: ",JSON.stringify(data));
        kafka.make_request('review', { "path": "get_reviews_customer", "body": data }, function (err, result) {
            if (!result) {
                console.log("Inside err");
                res.status(404);
                res.json({
                    status: "error",
                    msg: "Reviews not found",
                })
                res.end();
            } else {
                console.log("Inside Review data");
                // console.log("Data:", JSON.stringify(results));
                res.status(200);
                res.json(result)
                res.end();
                return;
            }
        });
    }

});

router.post("/addReview", function (req, res) {
    const data = {
        req: req.body
    }
    console.log("addReview: ", JSON.stringify(data));
    kafka.make_request('review', { "path": "add_review", "body": data }, function (err, result) {
        if (!result) {
            console.log("Inside err");
            res.status(404);
            res.json({
                status: "error",
                msg: "Reviews not found",
            })
            res.end();
        } else {
            console.log("Inside Add Review data");
            // console.log("Data:", JSON.stringify(results));
            res.status(200);
            res.json(result)
            res.end();
            return;
        }
    });
});


module.exports = router;