import axios from 'axios';

const instance = axios.create({
  baseURL: '/api/workspaceUser'
});

//service to user ask permission to enter a workspace
//the workspace it will be added to the user/model/workspace => after approved by operator it will go to the user/model/approved
//service para editar um workspace
const askPermissionWorkspace = async (userId, workspace) => {
  const result = await instance.put(`/edit/${userId}`, { workspace });
  return result.data;
};

export default askPermissionWorkspace;
