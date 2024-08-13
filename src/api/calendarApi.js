import axios from 'axios';
import { getEnvVariables } from '../helpers/getEnvVariables';

const { VITE_API_URL } = getEnvVariables();

const calendarApi = axios.create({
    baseURL: VITE_API_URL,
});

// Todo: configurar interceptores
// Antes de que hagas el request quiero que uses este interceptor:
calendarApi.interceptors.request.use( config => {
    // Agregamos el x-token en el header de la request
    config.headers = {
        ...config.headers,
        'x-token': localStorage.getItem('token')
    }
    return config;
})

export default calendarApi;