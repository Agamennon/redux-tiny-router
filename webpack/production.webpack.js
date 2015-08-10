var webpack = require('webpack');
var _ = require('lodash');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var path = require('path');

module.exports = function(dev_port,paths){

    var cfg =  require(path.resolve(paths.webpack,'base.webpack.js'))(paths);
    cfg.module.loaders[1].loader =  ExtractTextPlugin.extract(
        // activate source maps via loader query
        'css?sourceMap!' +
        "autoprefixer-loader?browsers=last 2 version!" +
        'sass?sourceMap'

    );

    cfg.plugins = _.union([
        new ExtractTextPlugin('styles.css'),
        new webpack.optimize.DedupePlugin(),
        new webpack.optimize.UglifyJsPlugin({
            minimize: true,
            compress: {
                warnings: false
            }

        })
    ],cfg.plugins);

    return cfg
};


