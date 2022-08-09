const {
  override,
  addWebpackPlugin,
} = require("customize-cra");
const webpack = require("webpack");
const StatsPlugin = require("stats-webpack-plugin");

module.exports = override(
  addWebpackPlugin(
    new webpack.DefinePlugin({
      __DEV__: process.env.NODE_ENV !== "production",
    }),
  ),
  addWebpackPlugin(
    new StatsPlugin("stats.json", {
      chunkModules: true,
    }),
  ),
);
