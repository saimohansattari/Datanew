const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');
 
module.exports = merge(common, {
  mode: 'development',
  devtool: 'inline-source-map',
  devServer: {
    static: './dist',
    port: process.env.PORT || 3000,  // Dynamically use PORT from .env.local or .env.development
    hot: true,
  },
});