import axios from 'axios';
import {urlApi} from "./constants";
import store from '../store/configureStore';

const axiosBase = axios.create({
    baseURL: urlApi
});

axiosBase.interceptors.request.use(config => {
    try {
        config.headers['Authorization'] = store.getState().users.user.token;
    } catch (e) {}
    return config;
})

export default axiosBase;