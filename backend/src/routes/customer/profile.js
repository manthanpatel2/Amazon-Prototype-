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
const { auth } = require("../../utils/passport");
const { checkCustomerAuth } = require("../../utils/passport");
auth();

const bucket = "ouramazonbucket1";

const s3Bucket = new aws.S3({
    accessKeyId: "AKIAJIMYICX5TT3QDPZA",
    secretAccessKey: "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"
})

console.log(`${process.env.accessKeyId}`, " ", `${process.env.secretAccessKey}`)
const upload = multer({
    storage: multers3({
        s3: s3Bucket,
        bucket: bucket,
        acl: "public-read",
        contentType: multers3.AUTO_CONTENT_TYPE,
        key: function (req, file, callback) {
            console.log("request body", req.body);
            // console.log("file: ", req.file);
            // console.log("files: ", req.files);
            callback(null, req.body.Name + '/' + Date.now().toString() + path.extname(file.originalname))
        }
    }),
}).single("Image");

// var storage = multer.diskStorage({
//     destination: (req, file, cb) => {
//         console.log("multer file", file);
//         cb(null, "./uploads");
//     },
//     filename: (req, file, cb) => {
//         cb(null, file.originalname);
//     }
// });

// const upload = multer({
//     storage: storage
// });
/*
app.post("/upload_file",upload.any(),(req,res)=>{
  res.send();
});
*/
// app.use('../../uploads', express.static(path.join(__dirname, '/uploads')));

router.get("/fetchprofile", (req, res) => {
    console.log("inside fetch profile", req.query.customerId);

    kafka.make_request("profile", { "path": "fetch_profile", "body": { _id: req.query.customerId } }, (err, results) => {
        console.log("fetching profile", typeof results);
        if (err) {
            console.log("inside error");
            res.json({
                status: "error",
                msg: err
            });
        } else {
            if (typeof results === "string") {
                res.sendStatus(400).end();
            } else {
                res.code = "200";
                res.send({
                    docs: results
                });
                console.log("Profile is populated by data");
                res.end("Profile is populated");
            }
        }
    });
})

router.post("/updatenamepic", function (req, res) {
    console.log("Inside Update Profile Post Request ");
    // for (let i = 0; i < req.file.Images.length; i++) {
    //     UpdatedImages[i] = req.protocol + "://" + req.hostname + ':3001/' + req.file[i].path;
    // }
    upload(req, res, function (error) {
        if (error instanceof multer.MulterError)
            return res.json({ status: "402", error: error })
        else if (error)
            return res.json({ status: "401", error: error.message })
        else {
            console.log("req.files- ", req.file.location);
            req.body.ProfileURL = req.file.location;

            console.log("request body is", req.body);
            kafka.make_request("profile", { "path": "namepic_func", "body": req.body }, function (err, results) {
                console.log("Inside name pic update Profile ");
                console.log(typeof results);

                if (err) {
                    console.log("Inside err");
                    res.json({
                        status: "error",
                        msg: err
                    });
                } else {
                    console.log("inside else1-namepic");
                    res.json(results);
                    res.end();
                }
            });
        }
    })
});


router.post("/updateaddress", function (req, res) {
    console.log("Inside Update Profile Post Request ");
    console.log("request body is", req.body);
    kafka.make_request("profile", { "path": "address_func", "body": req.body }, function (err, results) {
        console.log("Inside Address Update Profile ");
        console.log(typeof results);

        if (err) {
            console.log("Inside err");
            res.json({
                status: "error",
                msg: err
            });
        } else {
            console.log("inside else1");
            if (results.code === "400") {
                // console.log(results.value);
                console.log("inside 400");
                res.sendStatus(400).end();
            } else if (results.code === "200") {
                res.code = "200";
                console.log(" Address is updated");
                res.sendStatus(200).end("Address of the profile is updated");
            }
        }
    })
});

router.post("/updatecard", function (req, res) {
    console.log("Inside Update Card Profile Post Request");
    console.log("request body is", req.body);
    kafka.make_request("profile", { "path": "paymentcard_func", "body": data }, req.body, function (err, results) {
        console.log("Inside Payment Update Profile ");
        console.log(typeof results);

        if (err) {
            console.log("Inside err");
            res.json({
                status: "error",
                msg: err
            });
        } else {
            console.log("inside else1");
            if (results.code === "400") {
                // console.log(results.value);
                console.log("inside 400");
                res.sendStatus(400).end();
            } else if (results.code === "200") {
                res.code = "200";
                console.log(" Payment is updated");
                res.sendStatus(200).end("Payment of the profile is updated");
            }
        }
    });
});



router.post("/addCard", function (req, res) {
    console.log("Inside Added Card Profile Post Request");
    console.log("request body is", req.body);
    kafka.make_request("profile", { "path": "addCard", "body": req.body }, function (err, results) {
        console.log("Inside Payment Added card ");
        // console.log(typeof results);

        if (err) {
            console.log("Inside err");
            res.json({
                status: "error",
                msg: err
            });
        } else {
            console.log("inside else1");
            if (results.code === "400") {
                // console.log(results.value);
                console.log("inside 400");
                res.sendStatus(400).end();
            } else if (results.code === "200") {
                res.code = "200";
                console.log(" Payment is Added");
                res.json(results);
                res.end();
            }
        }
    });
});

module.exports = router;