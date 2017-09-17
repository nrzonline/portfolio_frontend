var webpackMerge = require('webpack-merge');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var commonConfig = require('./webpack.common.js');
var helpers = require('./helpers');

module.exports = webpackMerge(commonConfig, {
    devtool: 'cheap-module-eval-source-map',

    output: {
        publicPath: 'http://localhost:8080/'
    },

    devServer: {
        historyApiFallback: true,
        stats: 'minimal'
    }
});