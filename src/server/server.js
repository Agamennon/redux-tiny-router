
var express = require('express');
var path = require('path');
var paths = require('../../paths.js');
var http = require('http');
var app = express();

const port = 3000;
const dev_port = 4000;
const mode = process.env.NODE_ENV || 'development';



require('./app.js')(app,mode,paths.root,port);


var server = http.createServer(app);

server.listen(port, function () {
    //require('./apiServer.js')(app);
    var bundle = require('../../webpack/bundler/bundler.js');
    console.log('Server running, mode '+mode+', on port ' + ((mode === 'production') ? port : dev_port).toString());
   bundle(mode,port,dev_port,paths);
});
