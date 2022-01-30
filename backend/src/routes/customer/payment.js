const express = require("express");
const router = express.Router();
const kafka = require("../../../kafka/client");
const { auth } = require("../../utils/passport");
const { checkCustomerAuth } = require("../../utils/passport");
auth();

router.post("/payment", (req, res) => {
    console.log("inside customer payment api", req.body);

    let body = {
        id: req.body.id
    }
    kafka.make_request('account', { "path": "customer_payment", "body": body }, function (err, result) {
        console.log('got back from kafka customer_payment');
        if (err) {
            console.log('error', err)
            res.send(JSON.stringify({
                message: "Please try again"
            }))
        } else {
            console.log("customer payment result- ", result);
            if (result) {
                var payload = {
                    result: result
                }
            }
            res.status(200)
            res.send(payload)
        }
    });
})

module.exports = router;