import axios from 'axios';

const apiService = async (query, page) => {
  const searchParams = new URLSearchParams({
    q: query,
    page,
    per_page: 12,
    key: '28568340-15f9de8a92b9201436ce2885d',
    image_type: 'photo',
    orientation: 'horizontal',
  });

  const { data } = await axios.get(`https://pixabay.com/api/?${searchParams}`);

  return data;
};

export default apiService;
