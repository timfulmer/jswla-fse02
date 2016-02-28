/**
 * Created by timfulmer on 2/27/16.
 */
"use strict";

var express=require('express'),
  bodyParser = require('body-parser'),
  Promise=require('bluebird'),
  routes=require('./routes');

function initialize(options){
  options=options || {};
  function initializePromise(resolve,reject){
    var app=express();
    app.locals.title='Roshambo';
    app.use(bodyParser.urlencoded({
      extended: true
    }));
    app.use(bodyParser.json());
    app.use(function(req, res, next) {
      res.header("Access-Control-Allow-Origin", "*");
      res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
      next();
    });
    options.express=app;
    routes(options);
    var server=app
      .listen(3000,function(){
        console.log('%s listening at http://%s:%s',app.locals.title,
          server.address().address,server.address().port);
        options.server=server;
        return resolve(options);
      });
  }
  return new Promise(initializePromise);
}

module.exports=initialize;