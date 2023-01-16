import axios from 'axios';

const ApiAdm = axios.create({
    baseURL: "https://api-portobello.sensedia.com/dev/concierge-me/1.0/"
});

export default ApiAdm;