import axios from 'axios';
import PropTypes from 'prop-types';

const { REACT_APP_KEY } = process.env;

const instance = axios.create({
  baseURL: 'https://pixabay.com/api/',
 
});

export const getImg = async (q, per_page ,page = 1) => {
  const { data } = await instance.get('/', {
    params: {
      key: REACT_APP_KEY,
      q,
      page,
      per_page: per_page,
    },
  });
  return data;
};
getImg.propTypes = {
  q: PropTypes.string.isRequired,
  per_page: PropTypes.number.isRequired,
  page: PropTypes.number.isRequired,
}