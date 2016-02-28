/**
 * Created by timfulmer on 2/27/16.
 */
"use strict";

function initialize(options){
  var controllers=require('../controllers/');
  if(!options || !options.express){
    throw new Error('No express!');
  }
  options.express.post('/api/v1/throw',controllers.throws.createThrow);
  options.express.get('/api/v1/throw/open',controllers.throws.openThrows);
  options.express.put('/api/v1/throw/:throwId',controllers.throws.playThrow);
  options.express.get('/api/v1/throw/closed',controllers.throws.closedThrows);
}

module.exports=initialize;