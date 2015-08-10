module.exports = function(app,mode,root){

    var express = require('express');
    var path = require('path');
    var bodyParser = require('body-parser');
    var multer = require('multer');

    app.use(bodyParser.json()); // for parsing application/json
    app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
    app.use(multer()); // for parsing multipart/form-data
    app.use(express.static(path.resolve(root, 'public')));
};

