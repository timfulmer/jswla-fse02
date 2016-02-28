/**
 * Created by timfulmer on 2/27/16.
 */
"use strict";

var mongoose=require('mongoose'),
  ObjectId=mongoose.Types.ObjectId,
  Throw=mongoose.model('Throw');

function createThrow(req,res){
  var thro=new Throw(req.body);
  thro.save(function(err,thro){
    return res.json(thro);
  });
}
function openThrows(req,res){
  Throw
    .find({opponentThrow:{$exists:false}})
    .exec(function(err,throws){
      res.json(throws);
    });
}
function playThrow(req,res){
  Throw
    .findOne({_id:new ObjectId(req.params.throwId)})
    .exec(function(err,thro){
      thro.opponentThrow=req.body.opponentThrow;
      thro.opponentName=req.body.opponentName;
      thro.renderJudgement();
      thro.save(function(err,thro){
        return res.json(thro);
      })
    })
}
function closedThrows(req,res){
  Throw
    .find({opponentThrow:{$exists:true}})
    .exec(function(err,throws){
      res.json(throws);
    });
}

module.exports={
  createThrow:createThrow,
  openThrows:openThrows,
  playThrow:playThrow,
  closedThrows:closedThrows
};