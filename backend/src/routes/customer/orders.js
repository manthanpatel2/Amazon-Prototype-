const express = require("express");
const router = express.Router();
const kafka = require("../../../kafka/client");
const { auth } = require("../../utils/passport");
const { checkAllAuth, checkCustomerAuth } = require("../../utils/passport");
auth();

router.get("/", function (req, res) {

    if (req.query.CustomerID) {
        let data = {
            CustomerID: req.query.CustomerID
        }
        kafka.make_request('product', { "path": "get_customer_orders", "body": data }, function (err, result) {
            console.log("got back from get customer orders kafka");
            if (!result) {
                console.log("Inside err");
                res.status(404);
                res.json({
                    status: "error",
                    msg: "Orders not found",
                })
                res.end();
            } else {
                res.status(200);
                res.json(result)
                res.end();

            }
        });
    } else if (req.query.SellerID) {
        let data = {
            SellerID: req.query.SellerID
        }
        kafka.make_request('product', { "path": "get_seller_orders", "body": data }, function (err, result) {
            console.log("got back from get seller orders kafka");
            if (!result) {
                console.log("Inside err");
                res.status(404);
                res.json({
                    status: "error",
                    msg: "Orders not found",
                })
                res.end();
            } else {
                res.status(200);
                res.json(result)
                res.end();

            }
        });
    }
});

router.post("/placeOrder", (req, res) => {

    kafka.make_request('product', { "path": "place_order", "body": req.body }, function (err, result) {
        console.log("got back from place order kafka");
        if (!result) {
            console.log("Inside err");
            res.status(404);
            res.json({
                status: "error",
                msg: "Orders not found",
            })
            res.end();
        } else {
            res.status(200);
            res.json(result)
            res.end();
        }
    });
})

router.post("/updateOrder", (req, res) => {

    kafka.make_request('product', { "path": "update_order", "body": req.body }, function (err, result) {
        console.log("got back from update order kafka");
        if (!result) {
            console.log("Inside err");
            res.status(404);
            res.json({
                err: err
            })
            res.end();
        } else {
            res.status(200);
            res.json(result)
            res.end();
        }
    });
})

module.exports = router;