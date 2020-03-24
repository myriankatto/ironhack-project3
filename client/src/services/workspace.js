import axios from 'axios';

const instance = axios.create({
  baseURL: '/api/workspace'
});

//service para gerar a lista completa de workspaces
const list = async () => {
  try {
    const result = await instance.get('/');
    const workspaces = result.data;
    return workspaces;
  } catch (error) {
    throw error;
  }
};

//service para mostrar um workspace
const single = async id => {
  const result = await instance.get(`/${id}`);
  const workspace = result.data;

  return workspace;
};

//service para criar um workspace
const create = async data => {
  // console.log('data', data);
  const name = data.name;

  try {
    const newWorkspace = await instance.post('/create', { name });

    return newWorkspace;
  } catch (error) {
    throw error;
  }

  // const result = await instance.post(`/create`, { name });
  // console.log('result ->',result.data);
  // const newWorkspace = result.data;
  // return newWorkspace;
};

//service para editar um workspace
const edit = async (id, name) => {
  const result = await instance.put(`/edit/${id}`, { name });
  const workspace = result.data;
  return workspace;
};

//service para remover um workspace
const remove = async id => {
  const result = await instance.delete(`/${id}`);
  const workspace = result.data;
  return workspace;
};

export { list, single, create, edit, remove };
