# Simulation of Amazon

## Project Overview and Architecture Diagram
In this project, a 3-tier distributed application design implementing the functions of Amazon website is done. Different types of users are managed and implemented in Amazon Prototype.
Though Amazon.com has wide range of features, this project is limited to only few important functionalities which cover all the essential features required to place an order and implement the functionalities which involve different roles.
For each type of object, an associated database schema responsible for representing how a given object should be stored in a database is implemented.

![image](https://user-images.githubusercontent.com/52833369/98450209-c76cc900-20ef-11eb-82a4-df0d3a36c489.png)

System is built upon distributed architecture. Message queues is used as the middleware technology.
System supports the following types of entities:
a. Customers
b. Sellers
c. Admin users.
<br><br>
Project consists of multiple tiers:
- The client tier, where the user will interact with system
- The API tier, where all the server endpoints are, which takes requests from clients
- The middle tier/middleware/messaging system, which directs the requests from API layer to microservices in form of Kafka messages
- The sevices tier - this is where all the business logic reside which communicates with the Databases
- The Database tier, comprising a database to store the state of your entity objects

Functionalities like, 
- Customers can Log/Sign In to the system 

![image](https://user-images.githubusercontent.com/46435796/83479935-d23f7580-a44e-11ea-8b3e-76019cd2f2f4.png)

![image](https://user-images.githubusercontent.com/46435796/83479987-f8fdac00-a44e-11ea-9824-607c290bd2d7.png)

- Customer can also Search/Filter/Sort through 10000 available products via different criteria like Rating, Seller Name, Product Name, Price, etc.

![image](https://user-images.githubusercontent.com/46435796/83480023-192d6b00-a44f-11ea-9d26-78747552c64d.png)

![image](https://user-images.githubusercontent.com/46435796/83480697-e7b59f00-a450-11ea-960b-294c03521f58.png)

- Customer can Add product to Cart/Wishlist and swap products between them, can Checkout and Place an order and can also track orders which are placed.

![image](https://user-images.githubusercontent.com/46435796/83480103-598ce900-a44f-11ea-9ede-ded3efc580dc.png)

![image](https://user-images.githubusercontent.com/46435796/83480135-690c3200-a44f-11ea-9ea2-75b126a35597.png)

![image](https://user-images.githubusercontent.com/46435796/83480161-79bca800-a44f-11ea-8d8a-c33b05742a6c.png)

- Apart from these customer can update his/her profile by adding Profile Picture which is stored in AWS S3 and Add/Update multiple address and payment methods.

![image](https://user-images.githubusercontent.com/46435796/83480323-d61fc780-a44f-11ea-92b2-921817370adf.png)

![image](https://user-images.githubusercontent.com/46435796/83480339-e3d54d00-a44f-11ea-97c4-a8704c470999.png)

- On the other hand Admin and Seller can add product

![image](https://user-images.githubusercontent.com/46435796/83480422-2bf46f80-a450-11ea-9eb6-19fec66f75c1.png)

- Admin and Seller can view analytics and change the order status.

![image](https://user-images.githubusercontent.com/46435796/83480852-38c59300-a451-11ea-86ac-7d3ecd56e9a6.png)

![image](https://user-images.githubusercontent.com/46435796/83480893-5561cb00-a451-11ea-9606-c702a2fb2768.png)

- All these functionalities are implemented using REST based Web Services as Middleware technology. Kafka is used as a messaging platform for communication between front-end channels with backend systems.

## Getting Started

Clone code from the master branch and extract files on your local computer.

### Prerequisites

You need to have NodeJS and NPM(Node Package Manager) installed on your local device to succesfully run this project.

Node can be installed through this website[https://phoenixnap.com/kb/install-node-js-npm-on-windows]
Node can also be installed through NVM.
```
curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.33.1/install.sh | bash
```

### Installing

A step by step series of examples that tell you how to get a development env running

Clone repository on your local computer.
Traverse through the Backend folder, open terminal in this folder and enter
```
npm install
```
This will download all the dependencies required for the project.
After Installing all the dependencies enter
```
node index.js
```
"index.js" is our root file which will create connection with database and handle all the APIs

Travser to Frontend folder and again install the dependencies by entering
```
npm install
```
After Installing all the dependencies enter
```
npm start
```
* You need to install Kafka on your local computer and start Kafka and Zookeeper server.
Apache Kafka(https://kafka.apache.org/downloads)

Travser to Kafka-Backend folder and again install the dependencies by entering
```
npm install
```
After Installing all the dependencies enter
```
node server.js
```
It will create Kafka topics and will connect to Kafka server.

Everything is set and you are good to go.

## Running the tests

To run test for this system.
Traverse to test folder in Backend and enter
```
npm test
```
This will run the tests defined in the file.
You can add new Tests by adding test cases in this file.

## Deployment

To deploy this on live system go to aws.amazon.com and follow the steps to instantiate EC2 instance for each Backend, Frontend and Kafka Backend with Auto-Scaling and Load Balancer.

## Built With

* [NodeJS](https://nodejs.org/en/docs/) - Run time open source development platform
* [JavaScript](https://developer.mozilla.org/en-US/docs/Web/JavaScript) - Programing Language used
* [React](https://reactjs.org/docs/getting-started.html) - The library used
* [Redux](https://redux.js.org/introduction/getting-started) - The library used
* [Apache Kafka](https://kafka.apache.org/documentation/) - A distributed streaming platform and Message Queues 
* [Passport-JWT Token](http://www.passportjs.org/docs/) - Authentication Strategy used
* [MongoDB](https://docs.mongodb.com/) - NoSQL Database used
* [Redis](https://redis.io/documentation) - Used for SQL Caching
* [MySQL](https://dev.mysql.com/doc/) - SQL Database used

