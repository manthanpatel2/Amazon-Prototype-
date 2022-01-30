"use strict";
var JwtStrategy = require("passport-jwt").Strategy;
var ExtractJwt = require("passport-jwt").ExtractJwt;
const passport = require("passport");
var { secret } = require("./config");
const Customer = require("../models/customerModel");
const Seller = require("../models/sellerModel");
const Admin = require("../models/adminModel");

// Setup work and export for the JWT passport strategy
function auth() {
    var opts = {
        jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme("jwt"),
        secretOrKey: secret
    };
    // console.log("inside passport")
    passport.use("customer", new JwtStrategy(opts, (jwt_payload, callback) => {
        console.log("jwt payload", jwt_payload);
        const id = jwt_payload.id;
        Customer.findById(id, (err, results) => {
            if (err) {
                return callback(err, false);
            }
            if (results) {
                // console.log('results', results);
                callback(null, results);
            }
            else {
                callback(null, false);
            }
        });
    }))
    passport.use("seller", new JwtStrategy(opts, (jwt_payload, callback) => {
        console.log("jwt payload", jwt_payload);
        const id = jwt_payload.id;
        Seller.findById(id, (err, results) => {
            if (err) {
                return callback(err, false);
            }
            if (results) {
                callback(null, results);
            }
            else {
                callback(null, false);
            }
        });
    }))
    passport.use("admin", new JwtStrategy(opts, (jwt_payload, callback) => {
        console.log("jwt payload", jwt_payload);
        const id = jwt_payload.id;
        Admin.findById(id, (err, results) => {
            if (err) {
                return callback(err, false);
            }
            if (results) {
                callback(null, results);
            }
            else {
                callback(null, false);
            }
        });
    }))
    passport.use("all", new JwtStrategy(opts, (jwt_payload, callback) => {
        console.log("jwt payload", jwt_payload);
        const id = jwt_payload.id;
        Admin.findById(id, (err, results) => {
            if (err) {
                return callback(err, false);
            }
            if (results) {
                callback(null, results);
            }
            else {
                Seller.findById(id, (err, results1) => {
                    if (err) {
                        return callback(err, false);
                    }
                    if (results1) {
                        callback(null, results1);
                    }
                    else {
                        Customer.findById(id, (err, results2) => {
                            if (err) {
                                return callback(err, false);
                            }
                            if (results2) {
                                // console.log('results', results);
                                callback(null, results2);
                            }
                            else {
                                callback(null, false);
                            }
                        });
                    }
                });
            }
        });
    }))
}

exports.auth = auth;
exports.checkCustomerAuth = passport.authenticate("customer", { session: false });
exports.checkSellrAuth = passport.authenticate("seller", { session: false });
exports.checkAdminAuth = passport.authenticate("admin", { session: false });
exports.checkAllAuth = passport.authenticate("all", { session: false });
