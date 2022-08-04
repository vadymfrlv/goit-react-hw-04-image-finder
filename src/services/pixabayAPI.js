import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://pixabay.com/api/',
  params: {
    key: '28568340-15f9de8a92b9201436ce2885d',
    per_page: 12,
    image_type: 'photo',
    orientation: 'horizontal',
  },
});

export const apiService = async (page = 1, q = '') => {
  const { data } = await instance.get('/', {
    params: {
      page,
      q,
    },
  });
  return data;
};
