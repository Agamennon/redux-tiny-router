var webpack = require('webpack');

module.exports = function (config) {

    var baseWebpackConfig = require('./webpack/base.js');
    delete baseWebpackConfig.entry;
    delete baseWebpackConfig.output;
    baseWebpackConfig.devtool = 'cheap-module-eval';
    baseWebpackConfig.plugins.splice(0,1); //remove CommonVerdorsPlugin

    config.set({
        browsers: [ 'Chrome' ], //run in Chrome or in PhantomJS
        singleRun: true, //just run once by default
        frameworks: [ 'jasmine' ], //use the jasmine test framework
        files: [
            'karma.webpack.js' //just load this file
        ],
        preprocessors: {
            'karma.webpack.js': [ 'webpack', 'sourcemap' ] //preprocess with webpack and our sourcemap loader
        },
        reporters: [ 'dots' ], //report results in this format
        webpack:baseWebpackConfig,

        webpackServer: {
            noInfo: true //please don't spam the console when running in karma!
        }
    });
};


