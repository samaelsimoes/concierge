import axios from 'axios';

const Collection = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
});

export default Collection;