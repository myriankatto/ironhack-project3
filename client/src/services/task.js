import axios from 'axios';

const instance = axios.create({
  baseURL: '/api/task'
});

// const signIn = data =>
//   new Promise((resolve, reject) => {
//     instance
//       .post('/sign-in', data)
//       .then(result => {
//         const user = result.data.user;
//         resolve(user);
//       })
//       .catch(reject);
//   });

// const list = async () => {
//   try {
//     const result = await instance.get('/product/list');
//     const products = result.data.products;
//     return products;
//   } catch (error) {
//     throw error;
//   }
// };

//service para criar uma task com base no id do workspace
const create = async data => {
  console.log('server works', data);

  const name = data.name;
  //console.log(typeof );
  try {
    const result = await instance.post(`/create/${data.id}`, { name });
    // const newTask = result.data;
    // return newTask;
  } catch (error) {
    throw error;
  }
};

export { create };
