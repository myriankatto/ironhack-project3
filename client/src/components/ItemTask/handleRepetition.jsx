import React from 'react';

/*SERVICES PARA EDIÇão*/
import {edit as EditTask } from '../../services/task';
import { single as SingleWorkspace} from '../../services/workspace';
import { editWorkspace } from '../../services/score';

export const handleRepetition = async (props) => {
  const singleTask = props.singleTask;
  const id = singleTask._id;
  const repetition = singleTask.repetition;
  const doneTask = singleTask.done;
  const approved = singleTask.approved;
  const howlong = singleTask.howlong;
  let counter=0;
  const creationDate = new Date(singleTask.created_at);
  const groundZero = creationDate.valueOf();
  const workspace = singleTask.workspace;
 
  const today = new Date().valueOf();
  const differenceOfDays = Math.round((today - groundZero)/(1000*60*60*24));

  const frequencyOnDays = singleTask.frequency;

  const frequencyOnMilliseconds = singleTask.frequency*1000*24*60*60;
  const done = false;

  /*CASO A TASK TEM REPETIÇAO VOLTA PARA DONE IGUAL A FALSE*/
  if(repetition && approved && doneTask){
    // do {
    //   setInterval(
    //     async function(){
    //       await EditTask({id, done});
    //       counter++;
    //     }
    //     ,frequencyOnMilliseconds)
    // } while( counter < howlong)
  }

  /*ANALISE CASO O doneTask é falso e passou o prazo*/
 
    if(repetition && approved && !doneTask){
      // if(differenceOfDays%frequencyOnDays === 0){

      //   /*Tirar score do workspace*/
      //   const workspaceSingle = await SingleWorkspace(workspace);
      //   const oldPointsWorkspace = workspaceSingle.workspace.score;
      //   const newPointsWorspace = oldPointsWorkspace - 5;
      //   await editWorkspace({workspace, newPointsWorspace});

  
  
      // }
    }
  
  
  


  
  return (
    <div>
      {console.log('handleRepetition chamado')}
    </div>
  )
}
