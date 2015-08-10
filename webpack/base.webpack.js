var webpack = require('webpack');
var path = require('path');
var rmdir = require('rimraf');


module.exports = function base (p){

    rmdir(p.build,function(error){
        if (error)
            console.log(error);
    });

    return  {
        context: p.root,
        entry: {
            app: [
                path.resolve(p.app, 'main.jsx')
            ],
            vendors:['react/addons']
        },
        output: {
            path: p.build,
            filename: 'bundle.js',
            publicPath: '/build/'
        },
        module: {
            loaders: [
                {
                    test: /\.jsx?$/,
                    loaders: [
                        'babel?stage=0'
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
            new webpack.optimize.CommonsChunkPlugin('vendors', 'vendors.js'),
            new webpack.ProvidePlugin({  //qualquer hora que usar React ele preenche com require ('react/addons');
                "React": "react/addons",   //http://stackoverflow.com/questions/23305599/webpack-provideplugin-vs-externals
                "classnames": 'classnames',
                "sa": "superagent",
                "_": "lodash"
            })

        ]
    };
};

