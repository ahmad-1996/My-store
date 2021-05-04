const path = require('path');
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');

module.exports = {
  entry: {
    app: './src/index.js'
  },

  output: {
    path: path.join(__dirname, "/dist"),
    publicPath: '',
    filename: "main.js"
  },

  mode: "development",
  devServer:{
   contentBase: path.join(__dirname,"/dist"),
   port: 1239,
   writeToDisk: true,
   open: true,
  },

  module: {
    rules: [
      {
        test: /\.html$/i,
        loader: 'html-loader',
        options: {
          minimize: true,
        },
      },
      {

        test: /\.(sa|sc|c)ss$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              publicPath: '../'
            }
          },
          'css-loader',

        ]
      },
      {
        test: /\.(png|jpe?g|gif)$/i,
        use: [
          {
            loader: 'file-loader',
            options:{
              name:'[name].[ext]',
              outputPath:"images",
            }
          },
        ],
      },
      
    ],
    

  },

  plugins: [
    // new HtmlWebpackPlugin(),
    new HtmlWebpackPlugin({
      filename: "index.html",
      template: "./src/index.html",
    }),
    
    new MiniCssExtractPlugin({ filename: "css/style.css" }),
  ],

  optimization: {
    minimize: true,
    minimizer: [
      new CssMinimizerPlugin()
    ]
  }

}








