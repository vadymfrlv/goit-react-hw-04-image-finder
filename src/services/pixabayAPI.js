import axios from 'axios';

axios.defaults.baseURL = 'https://pixabay.com/api/';
const apiKey = '28568340-15f9de8a92b9201436ce2885d';

const fetchImagesWithQuery = async (searchQuery, page = 1) => {
  return axios(
    `?q=${searchQuery}&page=${page}&key=${apiKey}&image_type=photo&orientation=horizontal&per_page=12`
  ).then(response => response.data.hits);
};

const api = {
  fetchImagesWithQuery,
};

export default api;
