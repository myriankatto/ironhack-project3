import axios from 'axios';

const instance = axios.create({
  baseURL: '/api/task'
});


//service para criar uma task com base no id do workspace
const create = async data => {
  

  const name = data.name;
  const level = data.level;
  const urgency = data.urgency;
  const personal = data.personal;
  const category = data.category;
  const frequency = data.frequency;
  const description = data.description
  const approved = data.approved;
  const howlong= data.howlong;
  const repetition= data.repetition;
  
  try {
    const result = await instance.post(`/create/${data.id}`, 
    { name, frequency, level, personal, urgency, description, category , approved, repetition, howlong});
    // const newTask = result.data;
    // return newTask;
  } catch (error) {
    throw error;
  }
};


//Service para listar as tasks aprovadas
const list = async id => {
 
  try{
    const result = await instance.get(`/list/${id}`);
    const tasks = result.data;
    return tasks;
  }catch (error) {
    throw error;
  }
}

//Service para listar as tasks pendentes:
const pending = async id => {
  try{
    const result = await instance.get(`/list/pending/${id}`);
    const tasks = result.data;
    return tasks;
  }catch (error) {
    throw error;
  }
}


//service para editar um Task
const edit = async data => {
  const name = data.name;
  const level = data.level;
  const urgency = data.urgency;
  const personal = data.personal;
  const category = data.category;
  const frequency = data.frequency;
  const description = data.description;
  const owner = data.owner;
  const howlong= data.howlong;
  const repetition= data.repetition;

  let approved;
  if(data.approved === true){
     approved = data.approved;
  }else{
     approved = false;
  }
  
  const result = await instance.put(`/edit/${data.id}`, 
  {name, frequency, level, personal, urgency, description, category, approved, owner, howlong, repetition});
  const task = result.data;
  return task;
};

//service single para Taks
const single = async id => {
 
  try{
    const result = await instance.get(`/${id}`);
    const task = result.data;
    return task;
  }catch (error) {
    throw error;
  }
}

//Service para Delete Task
const remove = async id => {
  try{
    const result = await instance.delete(`/${id}`);
  }catch (error) {
    throw error;
  }
  
  // const workspace = result.data;
  // return workspace;
};



export { create, list, edit, single, remove, pending };
