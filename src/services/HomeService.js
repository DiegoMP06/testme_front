import axios from '../config/axios';

export default {
    tests(rules = {categoria_id: '', tipo_id: '', busqueda: ''}, pagina) {
        return axios.post('/api/home/tests?wUserVersion=true&page=' + pagina, rules, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('AUTH_TOKEN') ?? ''}`
            },
        });
    },
    salas(busqueda = {busqueda: ''}) {
        return axios.post('/api/home/salas?wUserSala=true', busqueda, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('AUTH_TOKEN') ?? ''}`
            },
        });
    }
}