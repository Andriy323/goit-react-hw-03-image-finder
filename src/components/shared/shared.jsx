import axios from 'axios';

const { REACT_APP_KEY } = process.env;

const instance = axios.create({
  baseURL: 'https://pixabay.com/api/',
  params: {
    per_page: 12,
  },
});

export const getImg = async (q, page = 1) => {
  const { data } = await instance.get('/', {
    params: {
      key: REACT_APP_KEY,
      q,
      page,
    },
  });
  return data;
};
