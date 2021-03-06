import axios from 'axios';

const instance = axios.create({
  baseURL: '/api/purchase'
});

const list = async () => {
  const result = await instance.get('/list');
  const purchases = result.data;
  return purchases;
};

const create = async plan => {
  await instance.post(`/create`, {plan});
};

export { list, create };
