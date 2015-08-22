
var webpack = require('webpack');
var path = require('path');

module.exports = function(mode,port,dev_port,paths){

    var webpackFile;

    switch (mode){
        case 'development':  webpackFile = path.resolve(paths.webpack,'development.webpack.js'); break;
        case 'hot':  webpackFile =  path.resolve(paths.webpack,'hot.webpack.js'); break;
        case 'hotify':  webpackFile = path.resolve(paths.webpack,'hotify.webpack.js'); break;
        case 'production': webpackFile = path.resolve(paths.webpack,'production.webpack.js'); break;
        case 'test': webpackFile = path.resolve(paths.webpack,'test.webpack.js'); break;
    }

    var bundleStart = null;
    // var cfg = require('../fuck.webpack.js')(paths); for buildServer.js
    var compiler = webpack(require(webpackFile)(dev_port,paths));


    compiler.plugin('compile', function() {
        bundleStart = Date.now();
    });
    compiler.plugin('done', function() {
        console.log('Bundled em ' + (Date.now() - bundleStart) + 'ms!');
    });

    if (mode !== 'production'){
        var WebpackDevServer = require('webpack-dev-server');
        var bundler = new WebpackDevServer(compiler, {
            publicPath: '/build/',
            proxy: { "*": 'http://localhost:'+port},
            hot: true,
            quiet: false,
            noInfo: true,
            headers: { 'Access-Control-Allow-Origin': '*' },
            historyApiFallback: true,
            stats: {
                progress:true,
                colors: true
            }
        });
        bundler.listen(dev_port, 'localhost', function () {
      //  bundler.listen(dev_port, '192.168.25.10', function () {
            console.log('Aguarde...');
        });
    }else {
        compiler.run(function(err, stats) {
            console.log('Production compiler done...');
        });
    }

};



