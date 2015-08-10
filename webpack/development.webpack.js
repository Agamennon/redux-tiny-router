var webpack = require('webpack');
var _ = require('lodash');
var path = require('path');

module.exports = function(dev_port,paths){
    var cfg =  require(path.resolve(paths.webpack,'base.webpack.js'))(paths);

 //   cfg.devtool = 'cheap-module-eval-source-map';

    cfg.entry.app = _.union([
        'webpack-dev-server/client?http://localhost:'+dev_port,
        'webpack/hot/dev-server'
    ],cfg.entry.app);

    cfg.plugins = _.union([
        new webpack.HotModuleReplacementPlugin(),
        new webpack.SourceMapDevToolPlugin(
            '[file].map', null,
            "[absolute-resource-path]", "[absolute-resource-path]")
    ],cfg.plugins);

    return cfg
};


