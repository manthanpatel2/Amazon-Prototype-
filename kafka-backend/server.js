var connection = new require('./kafka/Connection');
var { mongoDB } = require('./config');
var mongoose = require("mongoose");
var topicsToCreate = require('./topics/topic');
const account = require("./services/account");
const product = require("./services/product");
const review = require("./services/review");
const analytics = require("./services/analytics")
const seller_profile = require("./services/seller_profile")
const customerProfile = require("./services/profile");

var options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    poolSize: 500,
    bufferMaxEntries: 0
};
mongoose.connect(mongoDB, options, (err) => {
    if (err) {
        console.log("MONGODB connection error", err);
        console.log(`MongoDB Connection Failed`);
    } else {
        console.log(`MongoDB Connected`);
    }
});

const client = connection.getClient();

console.log("Topics: ", JSON.stringify(topicsToCreate));
client.createTopics(topicsToCreate, true, function (err, data) {
    if (err) {
        console.log("In Topic Creation: ", err);
        return;
    }
    console.log("Topics are created: ");
    console.log(data);
});



function handleTopicRequest(topic_name) {
    var consumer = connection.getConsumer(topic_name);
    var producer = connection.getProducer();
    // console.log('server is running ');
    consumer.on('message', function (message) {
        console.log('message received for ' + topic_name);
        // console.log(JSON.stringify(message.value));
        var data = JSON.parse(message.value);

        switch (topic_name) {
            case "account":
                account.serve(data.data, function (err, res) {
                    response(data, res, producer);
                    return;
                })
                break;
            case "product":
                product.serve(data.data, function (err, res) {
                    response(data, res, producer);
                    return;
                })
                break;
            case "review":
                review.serve(data.data, function (err, res) {
                    response(data, res, producer);
                    return;
                })
                break;
            case "analytics":
                analytics.serve(data.data, function (err, res) {
                    response(data, res, producer);
                    return;
                })
                break;
            case "seller_profile":
                console.log(" seller profile called bahar");
                seller_profile.serve(data.data, function (err, res) {
                    response(data, res, producer);
                    return;
                })
                break;
            case "profile":
                console.log(" customerProfile called bahar");
                customerProfile.serve(data.data, function (err, res) {
                    console.log(" customerProfile called")
                    response(data, res, producer);
                    return;
                })
                break;
        }
    });
}

function response(data, res, producer) {
    console.log('after handle', res);
    var payloads = [
        {
            topic: data.replyTo,
            messages: JSON.stringify({
                correlationId: data.correlationId,
                data: res
            }),
            partition: 0
        }
    ];
    producer.send(payloads, function (err, data) {
        console.log('producer send', data);
    });
    return;
}

// Add your TOPICs here
//first argument is topic name
//second argument is a function that will handle this topic request
handleTopicRequest("account", account);
handleTopicRequest("profile", customerProfile);
handleTopicRequest("product", product);
handleTopicRequest("review", review);
handleTopicRequest("analytics", analytics);
handleTopicRequest("seller_profile", seller_profile);
