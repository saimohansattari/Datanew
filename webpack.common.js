const Dotenv = require('dotenv-webpack');
 
module.exports = {
  // Other common configurations...
  plugins: [
    new Dotenv({
      path: `./.env.${process.env.NODE_ENV}`,  // Load the correct .env file based on the NODE_ENV
    }),
  ],
};