import axios from 'axios';

export async function fetchImages(searchValue, page = 1) {
  const KEY = '36107376-5eb274faeb1c59fc8698600ea';
  const URL = 'https://pixabay.com/api/';

  return await axios.get(URL, {
    params: {
      key: KEY,
      q: searchValue,
      image_type: 'photo',
      orientation: 'horizontal',
      safesearch: true,
      page: page,
      per_page: 40,
    },
  });
}
