var webpack = require('webpack');
var _ = require('lodash');
var path = require('path');


module.exports = function(dev_port,paths) {

    var cfg =  require('./base.webpack.js')(paths);

//cfg.devtool = 'cheap-module-eval-source-map';
 //   cfg.devtool = 'eval';  //usando SourceMapDevToolPlugin para o webpack pegar isso

    cfg.entry.app = _.union([
        'webpack-dev-server/client?http://localhost:'+dev_port,
        'webpack/hot/only-dev-server'
    ],cfg.entry.app);

    cfg.plugins = _.union([
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoErrorsPlugin(),
        new webpack.SourceMapDevToolPlugin(
            '[file].map', null,
            "[absolute-resource-path]", "[absolute-resource-path]")
    ],cfg.plugins);

    cfg.module.loaders[0].loaders.unshift('react-hot');

    return cfg;

};





//module.exports = cfg;

