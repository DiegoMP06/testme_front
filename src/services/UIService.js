import axios from '../config/axios';

export default {
    csrf() {
        return axios.get('/sanctum/csrf-cookie')
    },
}