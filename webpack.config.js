const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const BrowserSyncPlugin = require('browser-sync-webpack-plugin');

var pathsToClean = ["dist"];
var cleanOptions = {
  watch: true
};

module.exports = {
  entry: { main: "./src/js/file1.js" },
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "js/app.min.js"
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      },
      {
        test: /\.s?css/,
        use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"]
      },
      {
        test: /\.(gif|png|jpe?g|svg)$/i,
        use: [
          {
            loader: "file-loader",
            options: {
              name: "[name].[ext]",
              outputPath: "img/"
            }
          },
          {
            loader: "image-webpack-loader",
            options: {
              disable: true,
              mozjpeg: {
                progressive: true,
                quality: 65
              },
              optpng: {
                enabled: false
              },
              pngquant: {
                quality: "65-90",
                speed: 4
              },
              gifsicle: {
                interlaced: false
              },
              webp: {
                quality: 75
              }
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: "css/style.min.css",
      chunkFilename: "css/style.min.css"
    }),
    new HtmlWebpackPlugin({
      template: "./src/index.html",
      filename: "./index.html"
    }),
    new BrowserSyncPlugin(
      {
        host: "localhost",
        port: "8081",
        proxy: "http://localhost:8081"
      },
      {
        reload: false
      }
    ),
    new CleanWebpackPlugin(pathsToClean, cleanOptions)
  ]
};