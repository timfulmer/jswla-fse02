/**
 * Created by timfulmer on 2/27/16.
 */
'use strict';

var mongoose=require('./config/mongoose'),
  express=require('./config/express');

mongoose({})
  .then(express);