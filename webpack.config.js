const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './src/index.js',  // Entry point for your React app
  output: {
    path: path.resolve(__dirname, 'dist'),  // Output directory
    filename: 'bundle.js',  // Name of the bundled file
  },
  resolve: {
    extensions: ['.js', '.jsx'],  // Resolve JS and JSX files
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,  // Handle JSX and JS files
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react'],  // Babel presets for React
          },
        },
      },
      {
        test: /\.css$/,  // Handle CSS files
        use: ['style-loader', 'css-loader'],  // Inject styles into the DOM
      },
      {
        test: /\.(png|jpg|jpeg|gif|svg)$/i,  // Handle images
        type: 'asset/resource',
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './public/index.html',  // Use the template in your public folder
    }),
  ],
  devServer: {
    static: path.join(__dirname, 'dist'),
    compress: true,
    port: 3000,  // Development server port
    hot: true,  // Enable hot reloading
  },
  
  mode: 'development',  // Set to 'production' for production build
};
