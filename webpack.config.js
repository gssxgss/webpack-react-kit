const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');

const PATH = {
  ROOT: path.resolve(__dirname, "app"),
}
const FOLDER = {
  SRC: "src",
}

const isProd = () => {
  return process.env.NODE_ENV === 'production';
}

module.exports = {
  devtool: isProd() ? '' : 'source-map',
  entry: [
    path.resolve(PATH.ROOT, 'src/index'),
  ],
  module: {
    preLoaders: [
      {
        test: /\.jsx?$/,
        loaders: isProd() ? [] : ['eslint'],
        include: path.resolve(PATH.ROOT),
      }
    ],
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loaders: ['react-hot', 'babel']
      }, {
        test: /\.css$/,
        loaders: ['style', 'css', 'postcss']
      }
    ],
  },
  resolve: {
    extensions: ['', '.js', '.jsx'],
  },
  output: {
    path: isProd() ? path.resolve(PATH.ROOT, 'dist') : path.resolve(PATH.ROOT, 'build'),
    publicPath: '/',
    filename: 'bundle.js',
  },
  devServer: {
    contentBase: path.resolve(PATH.ROOT, 'build'),
    historyApiFallback: true,
    hot: true,
    inline: true,
    progress: true,
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin({
      title: 'Hello, World!'
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      }
    }),
  ],
  postcss: () => {
    return [
      require('precss'),
      require('autoprefixer')({
        browsers: ['last 2 versions'],
      }),
      require('postcss-assets')({
        loadPath: ['images/'],
      }),
    ];
  },
};
