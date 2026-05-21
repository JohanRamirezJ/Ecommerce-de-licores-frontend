import axios from 'axios';

class ApiSingleton {
    constructor() {
        if (!ApiSingleton.instance) {
            this.axiosInstance = axios.create({
                baseURL: 'https://johanramirezj.github.io/cumplea-os-ana-gabriela/',
            });
            ApiSingleton.instance = this;
        }
        return ApiSingleton.instance;
    }

    getInstance() {
        return this.axiosInstance;
    }

    setAuthToken(token) {
        if (token) {
            this.axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        } else {
            delete this.axiosInstance.defaults.headers.common['Authorization'];
        }
    }
}

const apiClient = new ApiSingleton();
const api = apiClient.getInstance();

export const setAuthToken = (token) => apiClient.setAuthToken(token);

export default api;
