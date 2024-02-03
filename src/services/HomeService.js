import axios from '../config/axios';

const token = localStorage.getItem('AUTH_TOKEN') ?? '';

export default {
    tests(rules = {categoria_id: '', tipo_id: '', busqueda: ''}, pagina) {
        return axios.post('/api/home/tests?wUserVersion=true&page=' + pagina, rules, {
            headers: {
                Authorization: `Bearer ${token}`
            },
        });
    },
    salas(busqueda = {busqueda: ''}) {
        return axios.post('/api/home/salas?wUserSala=true', busqueda, {
            headers: {
                Authorization: `Bearer ${token}`
            },
        });
    }
}