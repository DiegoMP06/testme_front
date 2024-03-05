import axios from '../config/axios';

const token = localStorage.getItem('AUTH_TOKEN') ?? '';

export default {
    user(user) {
        return axios.get(`/api/user/${user}?wSalasUser=true`, {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        });
    },
    visitas(page = 1) {
        return axios.get(`/api/visitas?wTestVersionVisita=true&wUserVersion=true&page=${page}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        });
    }
}