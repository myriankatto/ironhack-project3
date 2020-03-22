import React from 'react';

/*SERVICES PARA EDIÇão*/
import {edit as EditTask } from '../../services/task';

export const handleRepetition = async (props) => {
  const singleTask = props.singleTask;
  const id = singleTask._id;
  const repetition = singleTask.repetition;

  const approved = singleTask.approved;
  const howlong = singleTask.howlong;
  let counter=0;
  const creationDate = singleTask.created_at;
  const frequency = singleTask.frequency*1000;
  const done = false;

  if(repetition && approved){
    do {
      

      setInterval(
        async function(){
          console.log(counter);
          await EditTask({id, done});
          counter++;
        }
        ,frequency)
    } while( counter < howlong)
  }
  
  return (
    <div>
      
    </div>
  )
}
