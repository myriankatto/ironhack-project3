import axios from 'axios';

const instance = axios.create({
  baseURL: '/api/task'
});


//service para criar uma task com base no id do workspace
const create = async data => {
  // console.log('services works ', data);
  // console.log('name no services', data.name);

  const name = data.name;
  const level = data.level;
  const urgency = data.urgency;
  const personal = data.personal;
  const category = data.category;
  const frequency = data.frequency;
  const description = data.description

  //console.log(typeof );
  try {
    const result = await instance.post(`/create/${data.id}`, { name, frequency, level, personal, urgency, description});
    // const newTask = result.data;
    // return newTask;
  } catch (error) {
    throw error;
  }
};

const list = async id => {
  console.log(id);
  try{
    const result = await instance.get(`/list/${id}`);
    const tasks = result.data;
    return tasks;
  }catch (error) {
    throw error;
  }
}




export { create, list };
