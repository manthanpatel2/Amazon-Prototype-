const express = require("express");
const router = express.Router();
const { secret } = require("../../utils/config");
const jwt = require('jsonwebtoken');
const kafka = require("../../../kafka/client");
const { auth } = require("../../utils/passport");
const { checkCustomerAuth } = require("../../utils/passport");
auth();

router.post("/signIn", (req, res) => {
    console.log("inside customer signin api", req.body);

    let body = {
        email: req.body.email,
        password: req.body.password,
        role: req.body.role
    }
    kafka.make_request('account', { "path": "login", "body": body }, function (err, result) {
        console.log('got back from kafka login');
        if (err) {
            console.log('error', err)
            res.send(JSON.stringify({
                signInSuccess: false,
                message: "Please try again"
            }))
        } else {
            console.log("customer login result- ", result);
            if (result.signInSuccess) {
                var payload = {
                    signInSuccess: result.signInSuccess,
                    id: result.id,
                    name: result.name,
                    message: result.message,
                    role: result.role,
                    profileUrl: result.profileUrl,
                }
            }
            else {
                var payload = { signInSuccess: result.signInSuccess, message: result.message }
            }
            var token = jwt.sign(payload, secret, {
                expiresIn: 1008000 // in seconds
            });
            res.end(JSON.stringify({ token: "JWT " + token }))
        }
    });
})

router.post("/signUp", function (req, res) {
    console.log('inside signup api', req.body);

    kafka.make_request('account', { "path": "signup", "body": req.body }, function (err, result) {
        console.log('got back from kafka signup');
        if (err) {
            console.log('error', err)
            res.send({
                signInSuccess: false
            })
        } else {
            console.log("customer signup result- ", result);
            if (result.signInSuccess) {
                var payload = {
                    signInSuccess: result.signInSuccess,
                    id: result.id,
                    name: result.name,
                    message: result.message,
                    role: result.role
                }
            }
            else {
                var payload = { signInSuccess: result.signInSuccess, message: result.message }
            }
            var token = jwt.sign(payload, secret, {
                expiresIn: 1008000 // in seconds
            });
            res.end(JSON.stringify({ token: "JWT " + token }))
        }
    });
})

router.post("/getCart", function (req, res) {
    console.log('inside get cart', req.body);

    kafka.make_request('account', { "path": "get_cart", "body": req.body }, function (err, result) {
        console.log('got back from kafka customer_signup');
        res.status(200)
        console.log("customer get cart result- ", result);
        res.send(result.value)

    });
})

router.post("/updateCart", function (req, res) {
    console.log('inside get cart', req.body);

    kafka.make_request('account', { "path": "update_cart", "body": req.body }, function (err, result) {
        console.log('got back from kafka customer_signup');

        console.log("customer get cart result- ", result);
        res.send(result.value)

    });
})

router.post("/addCard", function (req, res) {
    console.log('inside get cart', req.body);

    kafka.make_request('account', { "path": "addCard", "body": req.body }, function (err, result) {
        console.log('got back from kafka addcard');
        res.status(200)
        console.log("customer add card result- ", result);
        res.send(result.value)

    });
})

module.exports = router;