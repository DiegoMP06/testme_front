import axios from '../config/axios';

export default {
    register(data) {
        return axios.post('/register', data);
    },
    login(data) {
        return axios.post('/login', data);
    },
    logout() {
        return axios.post('/logout');
    },
    borrarToken() {
        const token = localStorage.getItem('AUTH_TOKEN') ?? '';

        return axios.post('/api/logout', null, {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        })
    },
    enviarEmail() {
        return axios.post('/email/verification-notification');
    },
    verificarEmail({ id = '', hash = '', expires = '', signature = '' }) {
        return axios.get(`verify-email/${id}/${hash}?expires=${expires}&signature=${signature}`);
    },
    user(token) {
        return axios.get('api/user', {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
    }
}