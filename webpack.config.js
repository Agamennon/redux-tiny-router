
var path = require('path');

var reactExternal = {
    root: 'React',
    commonjs2: 'react',
    commonjs: 'react',
    amd: 'react'
};

var queryStringExternal = {
    root: 'query-string',
    commonjs2: 'query-string',
    commonjs: 'query-string',
    amd: 'query-string'
};

module.exports = {
    //context: __dirname + "/src",
    entry: "./src/index.js",
    output: {
        libraryTarget:'umd',
        path:  "./bin",
        filename: "reduxTinyRouter.js"

    },
    externals: {
        'react': reactExternal,
        'query-string':queryStringExternal
    },
    exclude:'React',
 //   devtool:'source-map',
    module: {
        loaders: [
            {
                test: /\.jsx?$/,
                loader:'babel?stage=0',
         //       loader:'babel?optional[]=runtime&stage=0',
                include:[path.resolve('src')],
                exclude: /node_modules/
            }
        ]
    }
};

