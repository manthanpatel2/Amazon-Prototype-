const express = require("express");
const router = express.Router();
const kafka = require("../../../kafka/client");
const { auth } = require("../../utils/passport");
const { checkAdminAuth, checkAllAuth } = require("../../utils/passport");
auth();

router.post("/listOfOrders", function (req, res) {
    kafka.make_request('product', { "path": "list_of_orders", "body": req.body }, function (err, result) {
        console.log("got back from list_of_orders kafka");
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
});

router.post("/changeStatus", (req, res) => {

    kafka.make_request('product', { "path": "change_status", "body": req.body }, function (err, result) {
        console.log("got back from change order status kafka");
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
module.exports = router;