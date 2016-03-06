/**
 * Created by timfulmer on 2/27/16.
 */
"use strict";

var mongoose=require('mongoose'),
  ObjectId=mongoose.Types.ObjectId,
  Throw=mongoose.model('Throw');

function createThrow(req,res){
  if(!req.body.playerName || !req.body.playerThrow){
    return res.status(400).send('No player throw information in request body.');
  }
  var thro=new Throw(req.body);
  thro.save(function(err,thro){
    if(err){
      console.log('Could not create throw:\n%s',err.stack);
      return res.status(502);
    }
    return res.json(thro);
  });
}
function openThrows(req,res){
  Throw
    .find({opponentThrow:{$exists:false}})
    .exec(function(err,throws){
      if(err){
        console.log('Could not find open throws:\n%s',err.stack);
        return res.status(502);
      }
      res.json(throws);
    });
}
function playThrow(req,res){
  if(!req.params.throwId){
    return res.status(400).send('No throwId in request parameters.');
  }
  if(!req.body.opponentName || !req.body.opponentThrow){
    return res.status(400).send('Missing opponent information in request body');
  }
  Throw
    .findOne({_id:new ObjectId(req.params.throwId)})
    .exec(function(err,thro){
      if(err || !thro){
        console.log('Could not find throw with id %s:\n%s',req.params.throwId,err.stack);
        return res.status(502);
      }
      thro.opponentThrow=req.body.opponentThrow;
      thro.opponentName=req.body.opponentName;
      thro.renderJudgement();
      thro.modified=new Date();
      thro.save(function(err,thro){
        if(err){
          console.log('Could not dave throw:\n%s',err.stack);
          return res.status(502);
        }
        return res.json(thro);
      })
    })
}
function closedThrows(req,res){
  Throw
    .find({opponentThrow:{$exists:true}})
    .exec(function(err,throws){
      if(err){
        console.log('Could not find closed throws:\n%s',err.stack);
        return res.status(502);
      }
      res.json(throws);
    });
}

module.exports={
  createThrow:createThrow,
  openThrows:openThrows,
  playThrow:playThrow,
  closedThrows:closedThrows
};