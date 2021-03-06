const HtmlWebPackPlugin = require("html-webpack-plugin");
const webpack = require('webpack'); 

const htmlPlugin = new HtmlWebPackPlugin({
 template: "./src/index.html",
 filename: "./index.html"
});

const envPlugin = new webpack.EnvironmentPlugin(["AUTH0_CLIENTID", "AUTH0_DOMAIN"]);

module.exports = {
  devServer: {
    historyApiFallback: true,
  },
  mode: 'development',
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
          test: /\.css$/,
          use: ["style-loader", "css-loader"]
        },

      ]
    },
   plugins: [htmlPlugin, envPlugin]
};