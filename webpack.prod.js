const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');
 
module.exports = merge(common, {
  mode: 'production',
  devtool: 'source-map',
  // Other production settings...
});
 
"scripts": {
  "start": "webpack serve --config webpack.dev.js --env NODE_ENV=development",
  "build:dev": "webpack --config webpack.prod.js --env NODE_ENV=development",
  "build:prod": "webpack --config webpack.prod.js --env NODE_ENV=production"
}