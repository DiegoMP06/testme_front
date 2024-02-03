import axios from '../config/axios';

const token = localStorage.getItem('AUTH_TOKEN') ?? '';

export default {
    crearSala(data) {
        return axios.post('/api/salas', data, {
            headers: {
                Authorization: `Bearer ${token}`
            },
        })
    },
    obtenerSalas(page) {
        return axios.get(`/api/salas?page=${page}`, {
            headers: {
                Authorization: `Bearer ${token}`
            },
        });
    },
    obtenerSala(id) {
        return axios.get(`/api/salas/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`
            },
        });
    },
    editarSala(id, data) {
        return axios.patch(`/api/salas/${id}`, data, {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        });
    },
}