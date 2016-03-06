/**
 * Created by timfulmer on 2/27/16.
 */
"use strict";

var mongoose=require('mongoose'),
  roshambo=['Rock','Paper','Scissors'],
  outcomes=['Player','Opponent','Draw'];

function transformJudgement(player,opponent,draw){
  if(player){
    return outcomes[0];
  }
  if(opponent){
    return outcomes[1];
  }
  if(draw){
    return outcomes[2];
  }
  throw new Error('Could not render judgement.');
}
function renderJudgement(){
  if(!this.playerThrow || !this.opponentThrow){
    throw new Error('Not enough information to render judgement.');
  }
  switch(this.playerThrow){
      case roshambo[0]: this.outcome=transformJudgement(
        this.opponentThrow===roshambo[2],
        this.opponentThrow===roshambo[1],
        this.opponentThrow===roshambo[0]
      );
      break;
    case roshambo[1]: this.outcome=transformJudgement(
        this.opponentThrow===roshambo[0],
        this.opponentThrow===roshambo[2],
        this.opponentThrow===roshambo[1]
      );
      break;
    case roshambo[2]: this.outcome=transformJudgement(
        this.opponentThrow===roshambo[1],
        this.opponentThrow===roshambo[0],
        this.opponentThrow===roshambo[2]
      );
      break;
    default:
      throw new Error('Could not render judgement.');
  }
}

var throwSchema=mongoose.Schema({
  created:{type:Date},
  modified:{type:Date},
  playerThrow:{type:'String',required:true,enum:roshambo},
  playerName:{type:'String'},
  opponentThrow:{type:'String',enum:roshambo},
  opponentName:{type:'String'},
  outcome:{type:'String',in:outcomes}
});
throwSchema.statics.roshambo=roshambo;
throwSchema.methods.renderJudgement=renderJudgement;
throwSchema.pre('save', function(next){
  var now=new Date();
  this.modified=now;
  if (!this.created) {
    this.created=now;
  }
  next();
});
module.exports=mongoose.model('Throw',throwSchema);