const swaggerJSDoc = require('swagger-jsdoc');

const swaggerDefinition = {
  openapi: '3.0.0',
  info: {
  title: 'Cars Rent',
  version: '1.0.0',
  description: 'Cars Rent University Node.js Project ',
  },
  };
  
  const options = {
  swaggerDefinition,
  apis: ['./routes/*.js'], // Path to the API routes in your Node.js application
  };
  
  const swaggerSpec = swaggerJSDoc(options);
  module.exports = swaggerSpec;