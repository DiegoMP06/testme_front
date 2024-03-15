import axios from '../config/axios';

export default {
    obtenerTest(id) {
        return axios.get(`/api/edu/test-versions/${id}/visitas?wTipo=true&wCategoria=true&wUserVersion=true&wVisita=true&wInstructions=true&wCampos=true&wCamposExtra=true`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('AUTH_TOKEN') ?? ''}`
            },
        });
    },
    obtenerTestSala(salaId, testSalaId) {
        return axios.get(`/api/edu/salas/${salaId}/test-salas/${testSalaId}/visita-salas?wTipo=true&wCategoria=true&wUserVersion=true&wVisitaSala=true&wInstructions=true&wCampos=true&wCamposExtra=true&wSalaTestSala=true&wTestVersionTestSala=true`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('AUTH_TOKEN') ?? ''}`
            },
        });
    },
    registrarVisita(id, data) {
        return axios.post(`/api/edu/test-versions/${id}/visitas`, data, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('AUTH_TOKEN') ?? ''}`,
            }
        });
    },
    registrarVisitaSala(salaId, testSalaId, data) {
        return axios.post(`/api/edu/salas/${salaId}/test-salas/${testSalaId}/visita-salas`, data, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('AUTH_TOKEN') ?? ''}`,
            }
        });
    },
    obtenerSala(id) {
        return axios.get(`/api/edu/salas/${id}/user-salas?wUserSala=true&wEnlace=true&wAlumnosSala=true&wProfesoresSala=true`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('AUTH_TOKEN') ?? ''}`,
            }
        });
    },
    obtenerUsuariosSala(id, profesores = false) {
        return axios.get(`/api/salas/${id}/user-salas?wProfesoresSala=${profesores ? 1 : 0}`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('AUTH_TOKEN') ?? ''}`,
            }
        });
    },
    registrarEnlaceSala(id, data) {
        return axios.post(`/api/edu/salas/${id}/user-salas?wAlumnosSala=true&wProfesoresSala=true&wEnlace=true`, data, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('AUTH_TOKEN') ?? ''}`,
            }
        });
    },
    eliminarEnlace(salaId, id) {
        return axios.delete(`/api/edu/salas/${salaId}/user-salas/${id}?wAlumnosSala=true&wProfesoresSala=true`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('AUTH_TOKEN') ?? ''}`,
            }
        });
    },
    obtenerTestsSala(salaId) {
        return axios.get(`/api/edu/salas/${salaId}/test-salas?wUserVersion=true`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('AUTH_TOKEN') ?? ''}`,
            }
        });
    },
}