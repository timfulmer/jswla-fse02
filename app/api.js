/**
 * Created by timfulmer on 2/27/16.
 */
'use strict';

var mongoose=require('./config/mongoose'),
  express=require('./config/express'),
  port=process.env.PORT || 3000;

mongoose({port:port})
  .then(express)
  .catch(function(err){
    console.log('Caught error starting express server:\n%s',err.stack);
    process.exit(1);
  });