import axios from '../config/axios';

export default {
    register(data) {
        return axios.post('/api/register', data);
    },
    login(data) {
        return axios.post('/api/login', data);
    },
    user(token) {
        return axios.get('/api/user', {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
    }
}