import axios from 'axios';

const Api = axios.create({
    baseURL: "https://api-portobello.sensedia.com"
});

export default Api;