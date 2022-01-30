var assert = require("assert");
var supertest = require("supertest");
var should = require("should");

var server = supertest.agent("http://localhost:3001");

//Unit Test begin
describe("MochaTest", function () {
    //Login
    it("Customer Should Fetch Cart", function (done) {

        server
            .post("/customer/getCart")
            .send({
                id: "5eab6173d38615de8330cd55"
            })
            .expect(200)
            .end(function (err, res) {
                console.log("Status: ", res.status);
                res.status.should.equal(200);
                done();
            })

    })

    it("Admin Cann Remove Category As Category Exists", function (done) {

        server
            .post("/admin/category/removeCategory")
            .send({
                Category : "Home Furniture"
            })    
            .expect(200)        
            .end(function (err, res) {
                console.log("Status: ", res.status);
                res.status.should.equal(200);
                done();
            })

    })

    it("Customer Should be able to Add new Payment Method", function (done) {

        server
            .post("/customer/addCard")
            .send({
                Number: "Hulk",
                NameOnCard: "0144 0355 6755 0155"
            })
            .expect(200)
            .end(function (err, res) {
                console.log("Status: ", res.status);
                res.status.should.equal(200);
                done();
            })

    })


    it("Customer Should not Login as Invalid redentials", function (done) {

        server
            .post("/customer/signIn")
            .send({
                email: "Russ_Heidenreich@hotmail.com",
                password: "cc123",
                role: "Customer"
            })
            .expect(401)
            .end(function (err, res) {
                console.log("Status: ", res.status);
                res.status.should.equal(401);
                done();
            })

    })

    it("Should Retieve Payment Details", function (done) {

        server
            .post("/customer/payment/payment")
            .send({
                id : "5eab6173d38615de8330cd55"
            })    
            .expect(200)        
            .end(function (err, res) {
                console.log("Status: ", res.status);
                res.status.should.equal(200);
                done();
            })

    })

    it("Admin Can Add New Category", function (done) {

        server
            .post("/admin/category/addCategory")
            .send({
                Category : "Home Furniture"
            })    
            .expect(200)        
            .end(function (err, res) {
                console.log("Status: ", res.status);
                res.status.should.equal(200);
                done();
            })

    })

    
    it("Admin Cannot Change Order Status As Order Do Not Exist", function (done) {

        server
            .post("/admin/order/changeStatus")
            .send({
                Status : "Delivered",
                Order_id : 225
            })    
            .expect(404)        
            .end(function (err, res) {
                console.log("Status: ", res.status);
                res.status.should.equal(404);
                done();
            })

    })


    it("Admin Can Search Orders From Seller Name", function (done) {

        server
            .post("/admin/orders/listOfOrders")
            .send({
                name : "sh"
            })    
            .expect(200)        
            .end(function (err, res) {
                console.log("Status: ", res.status);
                res.status.should.equal(200);
                done();
            })

    })

    it("Customer Cannot Delete Order As Order Already Delivered", function (done) {

        server
            .post("/orders/updateOrder")
            .send({
                OrderID : 113
            })    
            .expect(200)        
            .end(function (err, res) {
                console.log("Status: ", res.status);
                res.status.should.equal(200);
                done();
            })

    })

    it("Seller Cannot Delete Product As No Such Product Exists", function (done) {

        server
            .post("/seller/product/deleteProduct")
            .send({
                _id : "abcd"
            })    
            .expect(404)        
            .end(function (err, res) {
                console.log("Status: ", res.status);
                res.status.should.equal(404);
                done();
            })

    })
})