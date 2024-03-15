import axios from '../config/axios';

export default {
    obtenerCategorias() {
        return axios.get('/api/categorias', {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('AUTH_TOKEN') ?? ''}`
            },
        })
    },
    obtenerTipos() {
        return axios.get('/api/tipos', {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('AUTH_TOKEN') ?? ''}`
            },
        })
    },
    obtenerTestEditar(id) {
        return axios.get(`/api/tests/${id}?wCampos=true&wCamposExtra=true&wInstructions=true&wVersion=true`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('AUTH_TOKEN') ?? ''}`
            },
        });
    },
    index(page) {
        return axios.get('/api/tests?wVersion=true&wTipo=true&page=' + page, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('AUTH_TOKEN') ?? ''}`
            },
        });
    },
    obtenerTestsVersiones(salaId, page) {
        return axios.get(`/api/salas/${salaId}/test-salas?wCollVersiones=true&wEnlaceTest=true&page=${page}`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('AUTH_TOKEN') ?? ''}`
            },
        });
    },
    crear(data) {
        return axios.post('/api/tests', data, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('AUTH_TOKEN') ?? ''}`
            },
        });
    },
    show(id) {
        return axios.get(`/api/tests/${id}?wVersiones=true`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('AUTH_TOKEN') ?? ''}`
            },
        });
    },
    editar(id, data) {
        return axios.patch('/api/tests/' + id, data, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('AUTH_TOKEN') ?? ''}`
            },
        });
    },
    obtenerVersiones(testId, page) {
        return axios.get(`/api/tests/${testId}/test-versions?page=${page}`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('AUTH_TOKEN') ?? ''}`,
            }
        });
    },
    obtenerVersion(testId, versionId) {
        return axios.get(`/api/tests/${testId}/test-versions/${versionId}?wTipo=true&wCategoria=true&wCampos=true&wCamposExtra=true&wInstructions=true`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('AUTH_TOKEN') ?? ''}`,
            }
        });
    },
    obtenerVersionResultados(testId, versionId) {
        return axios.get(`/api/tests/${testId}/test-versions/${versionId}?wVisitasTest=true&wInstructions=true`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('AUTH_TOKEN') ?? ''}`,
            }
        });
    },
    editarVersion(id, testId, data) {
        return axios.patch(`/api/tests/${testId}/test-versions/${id}?wCategoria=true`, data, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('AUTH_TOKEN') ?? ''}`
            },
        });
    },
    eliminar(id) {
        return axios.delete(`/api/tests/${id}`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('AUTH_TOKEN') ?? ''}`
            },
        });
    },
    eliminarVersion(id, testId) {
        return axios.delete(`/api/tests/${testId}/test-versions/${id}`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('AUTH_TOKEN') ?? ''}`
            },
        });
    },
    obtenerResultados(versionId, page = 1, busqueda = '') {
        return axios.get(`/api/test-versions/${versionId}/visitas?busqueda=${busqueda}&page=${page}&wUserVisita=true`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('AUTH_TOKEN') ?? ''}`,
            }
        });
    },
    obtenerResultado(versionId, visitaId) {
        return axios.get(`/api/test-versions/${versionId}/visitas/${visitaId}?UserVisita=true&wRespuestasVisita=true&wUserVisita=true`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('AUTH_TOKEN') ?? ''}`,
            }
        });
    },
    obtenerTestSalas(versionId, page = 1) {
        return axios.get(`/api/test-versions/${versionId}/test-salas?wSalaTestSala=true&wUserSala=true&page=${page}`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('AUTH_TOKEN') ?? ''}`,
            }
        });
    },
    obtenerVersionSalaResultados(versionId, salaId) {
        return axios.get(`/api/test-versions/${versionId}/test-salas/${salaId}?wVisitasSalas=true&wInstructions=true&wSalaTestSala=true&wTestVersionTestSala=true`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('AUTH_TOKEN') ?? ''}`,
            }
        });
    },
    obtenerResultadosSala(versionId, salaId, page = 1, busqueda = '') {
        return axios.get(`/api/test-versions/${versionId}/test-salas/${salaId}/visita-salas?busqueda=${busqueda}&page=${page}&wUserVisitaSala=true`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('AUTH_TOKEN') ?? ''}`,
            }
        });
    },
    obtenerResultadoSala(versionId, salaId, visitaId) {
        return axios.get(`/api/test-versions/${versionId}/test-salas/${salaId}/visita-salas/${visitaId}?UserVisitaSala=true&wRespuestasVisitaSala=true&wUserVisitaSala=true`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('AUTH_TOKEN') ?? ''}`,
            }
        });
    },
}