/**
 * Created by timfulmer on 2/27/16.
 */
"use strict";

var express=require('express'),
  Promise=require('bluebird'),
  routes=require('./routes');

function logRequest(req,res,next){
  console.log('%s %s',req.method,req.path);
  return next();
}

function initialize(options){
  options=options || {};
  function initializePromise(resolve,reject){
    var app=express();
    app.locals.title='Roshambo';
    app.use(logRequest);
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