/**
 * Created by timfulmer on 2/27/16.
 */
"use strict";

function initialize(options){
  options=options || {};
  var controllers=require('../controllers/');
  if(!options.express){
    throw new Error('No express!');
  }
  if(!controllers.throws){
    throw new Error('No throws controller.');
  }
  options.express.post('/api/v1/throw',controllers.throws.createThrow);
  options.express.get('/api/v1/throw/open',controllers.throws.openThrows);
  options.express.put('/api/v1/throw/:throwId',controllers.throws.playThrow);
  options.express.get('/api/v1/throw/closed',controllers.throws.closedThrows);
}

module.exports=initialize;