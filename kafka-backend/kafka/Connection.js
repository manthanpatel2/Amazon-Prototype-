var kafka = require('kafka-node');

function ConnectionProvider() {

    this.getClient = function () {
        this.client = new kafka.KafkaClient({ kafkaHost: "127.0.0.1:9092" });
        return this.client;
    };


    this.getConsumer = function (topic_name) {

        this.client = new kafka.KafkaClient("127.0.0.1:9092");
        this.kafkaConsumerConnection = new kafka.Consumer(this.client, [{ topic: topic_name, partition: 0 }]);
        this.client.on('ready', function () { })

        return this.kafkaConsumerConnection;
    };

    //Code will be executed when we start Producer
    this.getProducer = function () {

        if (!this.kafkaProducerConnection) {
            this.client = new kafka.KafkaClient("127.0.0.1:9092");
            var HighLevelProducer = kafka.HighLevelProducer;
            this.kafkaProducerConnection = new HighLevelProducer(this.client);
            // this.kafkaConnection = new kafka.Producer(this.client);
            console.log('producer ready');
        }
        return this.kafkaProducerConnection;
    };
}
exports = module.exports = new ConnectionProvider;