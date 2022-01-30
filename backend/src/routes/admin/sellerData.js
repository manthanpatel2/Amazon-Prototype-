const express = require("express");
const router = express.Router();
const kafka = require("../../../kafka/client");
const { auth } = require("../../utils/passport");
const { checkAdminAuth, checkAllAuth } = require("../../utils/passport");
auth();

router.post("/", (req, res) => {
    console.log("Inside admin seller")
    kafka.make_request('seller_profile', { "path": "all_sellers", "body": req.body }, function (err, result) {
        console.log("got back from all sellers kafka");
        if (!result) {
            console.log("err ", err);
            res.end();
        } else {
            res.send(result)
        }
    })
})
module.exports = router;
