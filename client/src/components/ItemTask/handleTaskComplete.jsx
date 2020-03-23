import React from 'react';

/*Import SERVICES TASK*/
import { single as singleTask } from '../../services/task';
import { edit as editTask } from '../../services/task';

/*Import Services USER*/
import {editUSerPull} from '../../services/score';
import {editUSerPush} from '../../services/score';
import {single as singleUser } from '../../services/score';


/*Import Services para Workspace*/
import {editWorkspace} from '../../services/score';
import { single as SingleWorkspace } from '../../services/workspace';


export const handleTaskComplete = async (props) => {

  /*MUDAR O STAUS DA TAREFA PARA COMPLETA:*/
  /*ID DA TASK*/
  let id = props.id;
  let name;
  let level;
  let urgency;
  let personal;
  let category;
  let frequency;
  let description;
  let workspace;
  let approved;
  let owner;
  const done = true;
  
  const beforeTask = await singleTask(id);

  name = beforeTask.name;
  level = beforeTask.level;
  urgency = beforeTask.urgency;
  category = beforeTask.category;
  personal = beforeTask.personal;
  frequency = beforeTask.frequency;
  description= beforeTask.description;
  workspace=beforeTask.workspace;
  approved=beforeTask.approved;
  
  /*Promise transformara a situação da task para task feita:*/
  await editTask({id,name, level, urgency, personal, category, frequency, description, approved, owner, done});

  /*Dar ponto para o usuário que completou a task:*/
  const creatorId = props.user._id;
  const userWhoWillEarnPoints = await singleUser(creatorId);
  const oldPointsUser = userWhoWillEarnPoints.scoreUser.find(element => element.workspace === workspace).score
  let score = oldPointsUser;
  await editUSerPull({score,creatorId,workspace});

  if(level === 'easy'){
    score = oldPointsUser + 3;
  }else if(level === 'medium'){
    score = oldPointsUser + 5;
  }else{
    score = oldPointsUser + 7;
  }

  await editUSerPush({score,creatorId,workspace});

  /*Dar ponto para o workspace que completou a task:*/
  const workspaceSingle = await SingleWorkspace(workspace);
  const oldPointsWorkspace = workspaceSingle.workspace.score;

  let newPointsWorspace;

  if(level === 'easy'){
    newPointsWorspace = oldPointsWorkspace + 3;
  }else if(level === 'medium'){
    newPointsWorspace = oldPointsWorkspace + 5;
  }else{
    newPointsWorspace = oldPointsWorkspace + 7;
  }

  await editWorkspace({workspace, newPointsWorspace});



   

  return (
    <div>
    </div>
  )
}
