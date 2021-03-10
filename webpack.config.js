const webpack = require("webpack");
var path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const entry =
  process.env.NODE_ENV == "production" ? "./src/index.js" : "./test/index.js";

console.log("当前构建环境:", process.env.NODE_ENV);

const isDev = process.env.NODE_ENV !== "production";
const config = {
  mode: isDev ? "development" : "production",
  entry: {
    index: entry,
  },
  // target: "web",
  devtool: isDev ? "source-map" : "",
  output: {
    filename: "[name].js",
    chunkFilename: "lib/[name].[chunkhash].js",
    path: path.resolve(__dirname, "dist"),
    publicPath: "/",
    library: "Ice_utils",
    libraryTarget: "umd",
    // libraryExport: "default",
    // globalObject: `(typeof self !== 'undefined' ? self : this)`,
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: "babel-loader",
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: "index.html",
      template: path.resolve(__dirname, "src/index.html"),
      minify: {
        removeRedundantAttributes: true,
        collapseWhitespace: true,
        removeAttributeQuotes: true,
        removeComments: true,
        collapseBooleanAttributes: true,
      },
    }),
    new webpack.DefinePlugin({
      "process.env": {
        NODE_ENV: JSON.stringify(process.env.NODE_ENV),
      },
    }),
  ],
  devServer: {
    host: "127.0.0.1",
    contentBase: path.join(__dirname, "dist"),
  },
  optimization: {
    runtimeChunk: {
      name: "index",
    },
    splitChunks: {
      chunks: "all",
      cacheGroups: {
        vendors: {
          name: "vendors",
          test: /[\\/]node_modules[\\/]/,
          // 优先级
          priority: 10,
        },
        common: {
          name: "common",
          chunks: "all",
          // test: /[\\/]src[\\/]/,
          minChunks: 2,
          minSize: 1,
          priority: 1,
        },
      },
    },
  },
};

module.exports = config;
