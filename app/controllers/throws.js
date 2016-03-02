/**
 * Created by timfulmer on 2/27/16.
 */
"use strict";

var mongoose=require('mongoose'),
  ObjectId=mongoose.Types.ObjectId,
  Throw=mongoose.model('Throw');

function *createThrow(req,res){
  if(!req.body.playerName || !req.body.playerThrow){
    return res.send(400,'No player throw information in request body.');
  }
  var thro=yield new Throw(req.body).save();
  return res.json(thro);
}
function *openThrows(req,res){
  var throws=yield Throw.find({opponentThrow:{$exists:false}});
  return res.json(throws);
}
function *playThrow(req,res){
  if(!req.params.throwId){
    return res.send(400,'No throwId in request parameters.');
  }
  if(!req.body.opponentName || !req.body.opponentThrow){
    return res.send(400,'No opponent throw information in request body');
  }
  var thro=yield Throw.findOne({_id:new ObjectId(req.params.throwId)});
  return res.json(thro);
}
function *closedThrows(req,res){
  var throws=yield Throw.find({opponentThrow:{$exists:true},opponentName:{$exists:true}});
  return res.json(throws);
}

module.exports={
  createThrow:createThrow,
  openThrows:openThrows,
  playThrow:playThrow,
  closedThrows:closedThrows
};