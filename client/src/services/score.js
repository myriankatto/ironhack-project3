import axios from 'axios';

const instance = axios.create({
  baseURL: '/api/score'
});


//service single para qualquer User sem ser aquele logado para mudar score
const single = async id => {
 
  try{
    const result = await instance.get(`/${id}`);
    const user = result.data;
    return user;
  }catch (error) {
    throw error;
  }
}


//service para editar um User sem estar logado - PUSH
const editUSerPush = async data => {
  console.log('SERVICE EDIT', data);
  const id = data.creatorId;
  const workspace = data.workspace;
  const score = data.score;
  
  
  const result = await instance.put(`/edit/push/${id}`, {workspace,score});
  const user = result.data;
  return user;
};

//service para editar um User sem estar logado - PULL
const editUSerPull = async data => {
  console.log('SERVICE EDIT PULL', data);
  const id = data.creatorId;
  const workspace = data.workspace;
  const score = data.score;
  
  
  const result = await instance.put(`/edit/pull/${id}`, {workspace,score});
  const user = result.data;
  return user;
};

export {single, editUSerPull, editUSerPush}; 