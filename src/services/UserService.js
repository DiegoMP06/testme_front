import axios from '../config/axios';

const token = localStorage.getItem('AUTH_TOKEN') ?? '';

export default {
    user(user) {
        return axios.get(`/api/usuario/${user}?wSalasUser=true`, {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        });
    },
    visitas(page = 1) {
        return axios.get(`/api/usuario/visitas?wTestVersionVisita=true&wUserVersion=true&page=${page}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        });
    },
    visitasSalas(page = 1) {
        return axios.get(`/api/usuario/visitas-salas?wTestVersionVisitaSala=true&wUserVersion=true&wSalaVisitaSala=true&page=${page}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        });
    },
    salas(page = 1) {
        return axios.get(`/api/usuario/salas?wUserSala=true&page=${page}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        });
    }
}