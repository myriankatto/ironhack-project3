import axios from 'axios';
import ShareWorkspace from '../views/ShareWorkspace';

const instance = axios.create({
  baseURL: '/api/nodemailerRouter'
});

//this data comes from the component ShareByEmail
const shareWorkspaceByEmail = async (workspaceId, workspaceName, email) => {
  const result = await instance.post(`/${workspaceId}/${workspaceName}`, { email });
  return result.data;
};

export default shareWorkspaceByEmail;
