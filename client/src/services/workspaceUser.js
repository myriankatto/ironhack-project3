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

//this service will retrieve all the workspaces that the user is the operator
const editWorkspace = async userId => {
  const result = await instance.get(`/editWorkspace/${userId}`);
  return result.data;
};

//route to retrieve the users from single workspace for approval
const usersFromWorkspace = async workspaceId => {
  const result = await instance.get(`/usersFromWorkspace/${workspaceId}`);
  return result.data;
};
//route to retrieve the users from single workspaceAPPROVED APPROVED
const approvedUser = async workspaceId => {
  const result = await instance.get(`/approvedUser/${workspaceId}`);
  return result.data;
};

//route to approve the users
const usersApproved = async (userId, userWorkspaceId) => {
  console.log(userId.userWorkspaceId);
  const result = await instance.put(`/accept/${userId}/${userWorkspaceId}`);
  return result.data;
};
//route to reject the users that were never approved. pending users
const usersReject = async (userId, userWorkspaceId) => {
  const result = await instance.put(`/reject/${userId}/${userWorkspaceId}`);
  return result.data;
};

//route to remove the users that were previously approved
const approvedUsersReject = async (userId, userWorkspaceId) => {
  const result = await instance.put(`/rejectPreviouslyApprovedUser/${userId}/${userWorkspaceId}`);
  return result.data;
};

export {
  editWorkspace,
  askPermissionWorkspace,
  usersFromWorkspace,
  approvedUser,
  usersApproved,
  usersReject,
  approvedUsersReject
};
