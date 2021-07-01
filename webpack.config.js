const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const Dotenv = require("dotenv-webpack");
const webpack = require("webpack");
const ErrorOverlayPlugin = require("error-overlay-webpack-plugin");

const devMode = process.env.NODE_ENV !== "production";
module.exports = {
  entry: "src/index.tsx",
  output: {
    filename: "chunk.[fullhash].js",
    path: path.resolve(__dirname, "build"),
    assetModuleFilename: "assets/images/[hash][ext][query]",
    publicPath: "/",
  },
  resolve: {
    modules: [__dirname, "src", "node_modules"],
    extensions: ["*", ".js", ".jsx", ".tsx", ".ts"],
  },
  module: {
    rules: [
      {
        test: /\.(ts|js)x?$/,
        exclude: /node_modules/,
        loader: require.resolve("babel-loader"),
      },
      {
        test: /\.css$/i,
        use: [
          devMode ? "style-loader" : MiniCssExtractPlugin.loader,
          "css-loader",
        ],
      },
      {
        test: /\.s[ac]ss$/i,
        use: [
          devMode ? "style-loader" : MiniCssExtractPlugin.loader,
          "css-loader",
          "sass-loader",
        ],
      },
      {
        test: /\.less$/i,
        use: [
          devMode ? "style-loader" : MiniCssExtractPlugin.loader,
          "css-loader",
          "less-loader",
        ],
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: "asset/resource",
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        type: "asset/resource",
      },
    ],
  },
  plugins: [
    new ErrorOverlayPlugin(),
    new HtmlWebpackPlugin({
      template: "./public/index.html",
      favicon: "./public/favicon.ico",
    }),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: "./public/",
          to: "./",
          globOptions: {
            dot: true,
            gitignore: true,
            ignore: ["**/*.html", "**/*.js", "**/*.css", "**/*.scss"],
          },
        },
      ],
    }),
    new MiniCssExtractPlugin({
      filename: "vendor.[contenthash].css",
    }),
    new Dotenv(),
    new webpack.HotModuleReplacementPlugin(),
  ],
  devServer: {
    contentBase: path.join(__dirname, `src`),
    port: 3000,
    open: true,
    hot: true,
    historyApiFallback: true,
  },
  devtool: "cheap-module-source-map",
};
