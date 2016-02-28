/**
 * Created by timfulmer on 2/27/16.
 */
"use strict";
var Promise = require('bluebird');

function wrap(genFn){
  var cr=Promise.coroutine(genFn);
  return function(req, res, next){
    cr(req,res,next).catch(next);
  }
}
function initialize(options){
  options=options || {};
  var controllers=require('../controllers/');
  if(!options.express){
    throw new Error('No express!');
  }
  if(!controllers.throws){
    throw new Error('No throws controller.');
  }
  options.express.post('/api/v1/throw',wrap(controllers.throws.createThrow));
  options.express.get('/api/v1/throw/open',wrap(controllers.throws.openThrows));
  options.express.put('/api/v1/throw/:throwId',wrap(controllers.throws.playThrow));
  options.express.get('/api/v1/throw/closed',wrap(controllers.throws.closedThrows));
}

module.exports=initialize;