import React from 'react';
import { single } from '../../services/task';
import { edit } from '../../services/task';

import { single as CreatorTask } from '../../services/authentication';
import {editUSerWithoutLog as EditUSer } from '../../services/authentication';




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
  const oldPoints = userWhoWillEarnPoints.score;
  const scorePoint = oldPoints + 5;

  await EditUSer({creatorId, scorePoint});


  return (
    <div>
      {console.log('approved task')}
    </div>
  )
}
