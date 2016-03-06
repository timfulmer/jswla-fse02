/**
 * Created by timfulmer on 2/27/16.
 */
'use strict';
var mongoose=require('mongoose'),
  Promise=require('bluebird'),
  url='mongodb://jswla:jswla@ds035573.mongolab.com:35573/jswla';

function initialize(options){
  options=options || {};
  function initializePromise(resolve,reject){
    mongoose.connect(url);
    var connection=mongoose.connection;
    connection.on('error',function(err){
      console.log('Caught error connecting to MongoDB:\n%s',err.stack);
      return reject(err);
    });
    connection.once('open',function() {
      console.log("Connected to MongoDB server.");
      options.connection=connection;
      require('../models/');
      return resolve(options);
    });
  }
  return new Promise(initializePromise);
}

module.exports=initialize;