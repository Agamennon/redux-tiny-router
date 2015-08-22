import express from 'express';
import path from 'path';
import bodyParser from 'body-parser';
import multer from 'multer';
import compression from 'compression';
import render from './utils/render.js'
import httpProxy from 'http-proxy';
import session from 'express-session';

module.exports = function(app,mode,root,port) {
    app.use(session({
        secret: 'react and redux rule!!!!',
        resave: false,
        saveUninitialized: false,
        cookie: { maxAge: 60000 }
    }));
    app.use(bodyParser.json()); // for parsing application/json
    app.use(bodyParser.urlencoded({extended: true})); // for parsing application/x-www-form-urlencoded
    app.use(multer()); // for parsing multipart/form-data


    app.use(compression());

    app.set('views', 'src/server/views/');
    app.set('view engine', 'ejs');

    // app.use(express.static(path.resolve(root, 'public')));
    app.use(express.static(path.resolve(__dirname,'..','..','public')));

    app.use('/favicon.ico', (req, res) => {
        return
    });



    var data = {1:{gui:'legal'}};
    app.post('/api/data',function(req,res){
        var index = req.body.index;
        var dataItem = (data[index]);
        res.json(req.session.user);
    });
    app.post('/api/login',function(req,res){
        req.session.user = {user:req.body.text};
        console.log('user logged in');
        res.json(req.session.user);
    });
    app.post('/api/logout',function(req,res){
        delete req.session.user;
        res.json(req.session.user);
    });

    app.use(render); //remover


    // app.get('*', render);
};