import axios from 'axios';

/*const api = axios.create({
    baseURL: 'https://rocketseat-node.herokuapp.com/api'
});*/

const api = axios.create({
    baseURL: 'https://siga.aparecida.go.gov.br'
});

export default api;