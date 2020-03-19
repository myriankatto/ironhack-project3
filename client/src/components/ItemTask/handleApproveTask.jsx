import React from 'react';
import { single } from '../../services/task';
import { edit } from '../../services/task';



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
  
  
  await edit({id,name, level, urgency, personal, category, frequency, description, approved });

  return (
    <div>
      {console.log('approved task')}
    </div>
  )
}
