import axios from 'axios';

const Token = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
});

export default Token;