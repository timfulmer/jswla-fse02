/**
 * Created by timfulmer on 2/27/16.
 */
"use strict";

var express=require('express'),
  bodyParser = require('body-parser'),
  cors=require('cors'),
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
    app.use(cors());
    options.express=app;
    routes(options);
    var server=app
      .listen(3000,function(){
        console.log('%s listening at http://%s:%s',app.locals.title,
          server.address().address,server.address().port);
        options.server=server;
        return resolve(options);
      })
      .on('error',function(err){
        return reject(err);
      });
  }
  return new Promise(initializePromise);
}

module.exports=initialize;