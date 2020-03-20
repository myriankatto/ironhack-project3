import React from 'react';
import { single } from '../../services/task';
import { edit } from '../../services/task';

import { single as CreatorTask } from '../../services/score';
import {editUSerPull} from '../../services/score';
import {editUSerPush} from '../../services/score';




export const handleApproveTask = async (props) => {
  /*TASK ID*/
  const id = props.id;

  
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
  
  const beforeTask = await single(id);
  
  name = beforeTask.name;
  level = beforeTask.level;
  urgency = beforeTask.urgency;
  category = beforeTask.category;
  personal = beforeTask.personal;
  frequency = beforeTask.frequency;
  description= beforeTask.description;
  workspace=beforeTask.workspace;
  approved=true;

  /*USER CREATOR ID*/
  const creatorId = beforeTask.creator;
  
  await edit({id,name, level, urgency, personal, category, frequency, description, approved });

  

  const userWhoWillEarnPoints = await CreatorTask(creatorId);
  
  const oldPoints = userWhoWillEarnPoints.scoreUser.find(element => element.workspace === workspace).score
  let score;

  if(oldPoints !== undefined){
     score = oldPoints;
     await editUSerPull({creatorId, workspace, score});
  }else {
     score = 0
  }
 
  const newPoints = score + 5;
  score = newPoints;
  await editUSerPush({creatorId, workspace, score});
  


  return (
    <div>
      {console.log('approved task')}
    </div>
  )
}
