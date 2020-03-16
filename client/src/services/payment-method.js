import axios from 'axios';

const instance = axios.create({
  baseURL: '/api/payment-method'
});

// const list = async () => {
//   const result = await instance.get('/list');
//   const paymentMethods = result.data.paymentMethods;
//   return paymentMethods;
// };


//Listar todos os cards registrados pelo usuário
const list = async () => {
  try {
    const result = await instance.get('/list');
    const paymentMethods = result.data;
    return paymentMethods;
  } catch (error) {
    throw error;
  }
};

//para Criar um novo cartão do usuário:
const create = async (data) => {
  const result = await instance.post(`/create`, data);

  const newCard = result.data;
  return newCard;
};

// const create = async token => {
//   await instance.post('/create', { token });
// };

export { list, create };
