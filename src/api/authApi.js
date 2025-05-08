import axios from 'axios';
import { getEnvVariables } from '../helpers/getEnvVariables';


const { REACT_APP_API_BASE_URL } = getEnvVariables();


export const authApi = axios.create({
    baseURL: REACT_APP_API_BASE_URL,
});

//Todo: configurar Interceptores
authApi.interceptors.request.use((config) => {    
    config.headers = {
        ...config.headers,
        'x-token': localStorage.getItem('token'),
    };
    return config;
});