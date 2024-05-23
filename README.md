# Car rental system

## Project overview
This is a university project for my NodeJs course.

The car rental system is designed to facilitate the management and rental of cars to users. It includes features such as user authentication, car navigation, and rental management. This system is ideal for car rental companies.


## Technologies Used
- *Node.js*: Server-side JavaScript runtime.
- *Express.js*: Web application framework for Node.js.
- *Sequelize*: ORM to interact with databases like MySQL
- *Jest*: Testing framework for JavaScript.
- *Databases*: MySQL
- *Swagger*: API documentation tool.

## Getting Started

### Prerequisites
Before you begin, ensure you have the following installed:
- Node.js - [Download & Install Node.js](https://nodejs.org/en/download/)
- A package manager such as npm (comes with Node.js) or Yarn



## Installation
```
bash
git clone [https://github.com/alexmilitaru33/CarsRent]
cd car-renting-system
npm install
```


## Configuration

### Environment
Create a .env file in the root directory of the project. This file should contain the following environment variables:
```
DB_NAME
DB_USER
DB_PASS
DB_HOST
JWT_SECRET
```


These variables are used to configure the database connection and JWT authentication:

DB_NAME: The name of your database. 

DB_USER: The username for your database.

DB_PASS: The password for your database.

DB_HOST: The host address for your database.

JWT_SECRET: A secret key for signing JSON Web Tokens (JWT).


### Database Configuration
```
require('dotenv').config();
const { Sequelize } = require('sequelize');

// Create a new instance of Sequelize with database credentials from .env file
const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASS, {
    host: process.env.DB_HOST,
    dialect: 'mysql',
    logging: console.log
});

// Test the database connection
sequelize.authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });

module.exports = sequelize;
```



### Features
- User authentication
- Car browsing by Name
- Renting and returning cars
- List all the car order by prices for everyone
  

## Workflow
Below are the workflow diagrams illustrating the user authentication and car renting processes:

### Book Lending Workflow
![Car Renting Workflow](./doc/FlowChartRentCar.png)

## Database Schema
The following diagram illustrates the database schema used in the Car Renting System:

![Database Schema](./doc/Diagrama_CarsRent.png)

## Swagger
To explain better the endpoints of the application I used Swagger. In order to setup this tool, we have to follow the following steps:

### Instalation
```
npm install swagger-ui-express swagger-jsdoc
```

### Configuration
```
const swaggerJSDoc = require('swagger-jsdoc');

const swaggerDefinition = {
  openapi: '3.0.0',
  info: {
  title: 'car-renting-system',
  version: '1.0.0',
  description: 'University project',
  },
  };
  
  const options = {
  swaggerDefinition,
  apis: ['./routes/*.js'], // Path to the API routes in your Node.js application
  };
  
  const swaggerSpec = swaggerJSDoc(options);
  module.exports = swaggerSpec;
```

![Endpoints](./doc/sw1.png)
![Endpoints](./doc/sw2.png)



## Testing
In order to test the applicaction, I used Jest.

### Instalation

```
npm install --save-dev jest supertest
```


### Dependencies
In application.json, in the root of the project, there is necessar to add the following syntax:
```
"scripts": {
    "test": "jest"
  }
```
## Run tests
```
npm test
```
