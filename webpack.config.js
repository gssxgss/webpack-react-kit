const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const webpack = require("webpack");

const ROOT_PATH = path.resolve(__dirname);

const isProd = () => {
  return process.env.NODE_ENV === "production";
}

module.exports = {
  devtool: isProd() ? "" : "source-map",
  entry: [
    path.resolve(ROOT_PATH, "app/src/index"),
  ],
  module: {
    preLoaders: [
      {
        test: /\.jsx?$/,
        loaders: isProd() ? [] : ["eslint"],
        include: path.resolve(ROOT_PATH, "app"),
      }
    ],
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loaders: ["react-hot", "babel"]
      }, {
        test: /\.scss$/,
        loaders: ["style", "css", "sass"]
      }
    ],
  },
  resolve: {
    extensions: ["", ".js", ".jsx"],
  },
  output: {
    path: isProd() ? path.resolve(ROOT_PATH, "app/dist") : path.resolve(ROOT_PATH, "app/build"),
    publicPath: "/",
    filename: "bundle.js",
  },
  devServer: {
    contentBase: path.resolve(ROOT_PATH, "app/build"),
    historyApiFallback: true,
    hot: true,
    inline: true,
    progress: true,
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin({
      title: "Hello, World!"
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      }
    }),
  ]
};
