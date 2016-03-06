/**
 * Created by timfulmer on 2/27/16.
 */
'use strict';

function ok(req,res){
  return res.send('OK');
}

function initialize(options){
  var controllers=require('../controllers/');
  options.express.post('/api/v1/throw',ok);
  options.express.get('/api/v1/throw/open',ok);
  options.express.put('/api/v1/throw/:throwId',ok);
  options.express.get('/api/v1/throw/closed',ok);
}

module.exports=initialize;