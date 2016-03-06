/**
 * Created by timfulmer on 2/27/16.
 */
"use strict";

var mongoose=require('mongoose'),
  ObjectId=mongoose.Types.ObjectId,
  Throw=mongoose.model('Throw');

function *createThrow(req,res){
  if(!req.body.playerName || !req.body.playerThrow){
    return res.status(400).send('No player throw information in request body.');
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
    return res.status(400).send('No throwId in request parameters.');
  }
  if(!req.body.opponentName || !req.body.opponentThrow){
    return res.status(400).send('Missing opponent information in request body');
  }
  var thro=yield Throw.findOne({_id:new ObjectId(req.params.throwId)});
  thro.opponentName=req.body.opponentName;
  thro.opponentThrow=req.body.opponentThrow;
  thro.renderJudgement();
  thro=yield thro.save();
  return res.json(thro);
}
function *closedThrows(req,res){
  var throws=yield Throw
    .find({opponentThrow:{$exists:true},opponentName:{$exists:true}});
  throws=throws.sort(function(a,b){
    return b.created.getTime()-a.created.getTime();
  });
  return res.json(throws);
}

module.exports={
  createThrow:createThrow,
  openThrows:openThrows,
  playThrow:playThrow,
  closedThrows:closedThrows
};