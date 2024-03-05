import axios from '../config/axios';

const token = localStorage.getItem('AUTH_TOKEN') ?? '';

export default {
    obtenerCategorias() {
        return axios.get('/api/categorias', {
            headers: {
                Authorization: `Bearer ${token}`
            },
        })
    },
    obtenerTipos() {
        return axios.get('/api/tipos', {
            headers: {
                Authorization: `Bearer ${token}`
            },
        })
    },
    obtenerTestEditar(id) {
        return axios.get(`/api/tests/${id}?wCampos=true&wCamposExtra=true&wInstructions=true&wVersion=true`, {
            headers: {
                Authorization: `Bearer ${token}`
            },
        });
    },
    index(page) {
        return axios.get('/api/tests?wVersion=true&wTipo=true&page=' + page, {
            headers: {
                Authorization: `Bearer ${token}`
            },
        });
    },
    obtenerTestsVersiones(salaId, page) {
        return axios.get(`/api/salas/${salaId}/test-salas?wVersiones=true&wEnlaceTest=true&page=${page}`, {
            headers: {
                Authorization: `Bearer ${token}`
            },
        });
    },
    crear(data) {
        return axios.post('/api/tests', data, {
            headers: {
                Authorization: `Bearer ${token}`
            },
        });
    },
    show(id) {
        return axios.get(`/api/tests/${id}?wTipo=true&wCategoria=true&wCampos=true&wCamposExtra=true&wInstructions=true&wVersiones=true`, {
            headers: {
                Authorization: `Bearer ${token}`
            },
        });
    },
    editar(id, data) {
        return axios.patch('/api/tests/' + id, data, {
            headers: {
                Authorization: `Bearer ${token}`
            },
        });
    },
    editarVersion(id, testId, data) {
        return axios.patch(`/api/tests/${testId}/test-versions/${id}?wCategoria=true`, data, {
            headers: {
                Authorization: `Bearer ${token}`
            },
        });
    },
    eliminar(id) {
        return axios.delete(`/api/tests/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`
            },
        });
    },
    eliminarVersion(id, testId) {
        return axios.delete(`/api/tests/${testId}/test-versions/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`
            },
        });
    },
}