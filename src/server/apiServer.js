import express from 'express';
var http = require('http');
import bodyParser from 'body-parser';
import multer from 'multer';
import compression from 'compression';
import httpProxy from 'http-proxy';
import render from './utils/render.js'


module.exports = function(app) {

    var appProxy = express();

    var proxy = httpProxy.createProxyServer({
        target: 'http://localhost:' + 3500
    });


    app.use('/api', (req, res) => {  //proxy from app to here
        proxy.web(req, res);
    });


    app.use(render);


    proxy.on('proxyReq', function(proxyReq, req, res, options) {
        console.log('request proxied...');
     //   console.log(proxyReq);
    });


    appProxy.use(bodyParser.json()); // for parsing application/json
  //  appProxy.use(bodyParser.urlencoded({extended: true})); // for parsing application/x-www-form-urlencoded
  //  appProxy.use(multer()); // for parsing multipart/form-data
  //  appProxy.use(compression());


    var data2 = {1:{gui:'legal'}};

    appProxy.post('/data',function(req,res){
        console.log('api handler called');
           var index = req.body.index;
           var dataItem = (data2[index]);
           res.json(dataItem);
    //    res.send('helllo motherfuckers!');
    //    res.end();
    });

    appProxy.get('/',function(req,res){
        console.log('api handler called');
        res.send('you have the proxy server');
        res.end();
        //    res.send('helllo motherfuckers!');
        //    res.end();
    });


    var proxyServer = http.createServer(appProxy);

    proxyServer.listen(3500, function () {

        console.log('proxy server running...');

    });

};