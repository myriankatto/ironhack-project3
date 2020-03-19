import axios from 'axios';

const instance = axios.create({
  baseURL: '/api/authentication'
});

const signUp = data =>
  new Promise((resolve, reject) => {
    instance
      .post('/sign-up', data)
      .then(result => {
        const user = result.data.user;
        resolve(user);
      })
      .catch(reject);
  });

const signIn = data =>
  new Promise((resolve, reject) => {
    instance
      .post('/sign-in', data)
      .then(result => {
        const user = result.data.user;
        resolve(user);
      })
      .catch(reject);
  });

const signOut = () =>
  new Promise((resolve, reject) => {
    instance
      .post('/sign-out')
      .then(result => {
        resolve();
      })
      .catch(reject);
  });

const loadUserInformation = () =>
  new Promise((resolve, reject) => {
    instance
      .get('/user-information')
      .then(result => {
        const user = result.data.user;
        resolve(user);
      })
      .catch(reject);
  });

const editUserInformation = async data => {
  const form = new FormData();
  form.append('name', data.name);
  form.append('email', data.email);
  form.append('picture', data.picture);
  const result = await instance.patch('/user-information', form);
  const user = result.data.user;
  return user;
};

//service single para qualquer User sem ser aquele logado
const single = async id => {
 
  try{
    const result = await instance.get(`/${id}`);
    const user = result.data;
    return user;
  }catch (error) {
    throw error;
  }
}


//service para editar um User sem estar logado
const editUSerWithoutLog = async data => {
  console.log('SERVICE EDIT', data);
  const id = data.creatorId;
  const score = data.scorePoint;
  
  
  const result = await instance.put(`/edit/${id}`, {score});
  const user = result.data;
  return user;
};


export { signIn, signUp, signOut, loadUserInformation, editUserInformation, single, editUSerWithoutLog};