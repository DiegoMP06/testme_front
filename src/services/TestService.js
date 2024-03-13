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
        return axios.get(`/api/salas/${salaId}/test-salas?wCollVersiones=true&wEnlaceTest=true&page=${page}`, {
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
        return axios.get(`/api/tests/${id}?wVersiones=true`, {
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
    obtenerVersiones(testId, page) {
        return axios.get(`/api/tests/${testId}/test-versions?page=${page}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        });
    },
    obtenerVersion(testId, versionId) {
        return axios.get(`/api/tests/${testId}/test-versions/${versionId}?wTipo=true&wCategoria=true&wCampos=true&wCamposExtra=true&wInstructions=true`, {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        });
    },
    obtenerVersionResultados(testId, versionId) {
        return axios.get(`/api/tests/${testId}/test-versions/${versionId}?wVisitasTest=true&wInstructions=true`, {
            headers: {
                Authorization: `Bearer ${token}`,
            }
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
    obtenerResultados(versionId, page = 1, busqueda = '') {
        return axios.get(`/api/test-versions/${versionId}/visitas?busqueda=${busqueda}&page=${page}&wUserVisita=true`, {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        });
    },
    obtenerResultado(versionId, visitaId) {
        return axios.get(`/api/test-versions/${versionId}/visitas/${visitaId}?UserVisita=true&wRespuestasVisita=true&wUserVisita=true`, {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        });
    },
    obtenerTestSalas(versionId, page = 1) {
        return axios.get(`/api/test-versions/${versionId}/test-salas?wSalaTestSala=true&wUserSala=true&page=${page}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        });
    },
}