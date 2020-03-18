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

  
  try {
    const result = await instance.post(`/create/${data.id}`, { name, frequency, level, personal, urgency, description, category});
    // const newTask = result.data;
    // return newTask;
  } catch (error) {
    throw error;
  }
};


//Service para listar a task
const list = async id => {
 
  try{
    const result = await instance.get(`/list/${id}`);
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
  const description = data.description

  
  const result = await instance.put(`/edit/${data.id}`, {name, frequency, level, personal, urgency, description, category });
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




export { create, list, edit, single };
