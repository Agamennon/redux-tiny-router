//alternative to using babel/register (will bundle the whole server)

//rule: do not require using expressions all requires need to be a string
//sugestion : maybe detatch the client build process from the server
//use JDOM to render stuff ??? maybe...

//http://jlongster.com/Backend-Apps-with-Webpack--Part-I

//TODO CSS SHOULD BE EXTRACTED AWAY JUST LIKE THE PRODUCTION BUILD

// IGNORE NODE_MODULES METHOD 1
var nodeModules = {};
fs.readdirSync('node_modules')
    .filter(function(x) {
        return ['.bin'].indexOf(x) === -1;
    })
    .forEach(function(mod) {
        nodeModules[mod] = 'commonjs ' + mod;
    });

// IGNORE NODE_MODULES METHOD 2
var node_modules = fs.readdirSync('node_modules').filter(function(x) { return x !== '.bin' });


module.exports = {
    context: path.resolve(__dirname),
    entry: './src/server/server.js',
    target: 'node',
    externals: node_modules, //METHOD 2
    output: {
        libraryTarget: "commonjs2",  //for METHOD 2 ONLY
        path: path.join(__dirname),
        filename: 'backend.js',
        publicPath: '/build/'
    },

    module: {

        loaders: [
            {test: /\.jsx?$/, exclude: /node_modules/, loaders: [ 'babel?optional[]=runtime&stage=0'] },
            {
                test: /\.css$|scss/,
                loader: ExtractTextPlugin.extract(
                    'css?sourceMap!' +
                    "autoprefixer-loader?browsers=last 2 version!" +
                    'sass?sourceMap',{path:'./public/build',publicPath:'/build'}
                )
            }

        ]
    },

    plugins: [
        new ExtractTextPlugin('styles.css'),
        new webpack.optimize.DedupePlugin(),
        new webpack.optimize.UglifyJsPlugin({
            minimize: true,
            compress: {
                warnings: false
            }

        }),
        new webpack.BannerPlugin('require("source-map-support").install();',
            { raw: true, entryOnly: false })
    ],
    devtool: 'sourcemap'
};



// working example that can be called from bundle
/*
var webpack = require('webpack');
var path = require("path");

module.exports = function base (p){



    return [{

        entry: {
            "app": [
                "webpack-dev-server/client?http://localhost:4000",
                "webpack/hot/only-dev-server",
                path.resolve('src','client', 'client.jsx')
            ]
        },
        output: {
            "path": "/public/build",
            "filename": "bundle.js",
            "publicPath": "/build/"
        },
        module: {
            loaders: [
                {
                    test: /\.jsx?$/,
                    loaders: [
                        'babel?optional[]=runtime&stage=0'
                    ],
                    exclude: [p.node,p.build]

                },
                {
                    test: /\.css$|scss/,
                    loader: 'style!css!sass'
                },
                {
                    test: /\.json/,
                    loader: 'json'
                }
            ]
        },
        plugins: [
            new webpack.HotModuleReplacementPlugin(),
            new webpack.NoErrorsPlugin(),
            new webpack.SourceMapDevToolPlugin(
                '[file].map', null,
                "[absolute-resource-path]", "[absolute-resource-path]"),

            new webpack.DefinePlugin({
                __VERSION__: JSON.stringify("0.0.1"),
                __NODE_ENV__: JSON.stringify(process.env.NODE_ENV || 'development'),
                __DEBUG__: true,
                __DEVELOPMENT__: JSON.stringify(process.env.NODE_ENV !== 'production'),
                __CLIENT__: true,
                __SERVER__: false
            })


        ]
    }

    ];
};


*/

