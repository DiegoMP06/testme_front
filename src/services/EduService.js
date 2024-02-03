import axios from '../config/axios';

const token = localStorage.getItem('AUTH_TOKEN') ?? '';

export default {
    obtenerTest(id) {
        return axios.get(`/api/edu/test-versions/${id}/visitas?wTipo=true&wCategoria=true&wUserVersion=true&wVisita=true&wInstructions=true&wCampos=true&wCamposExtra=true`, {
            headers: {
                Authorization: `Bearer ${token}`
            },
        });
    },
    registrarVisita(id, data) {
        return axios.post(`/api/edu/test-versions/${id}/visitas`, data, {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        });
    },
    obtenerSala(id) {
        return axios.get(`/api/edu/salas/${id}/alumno-salas?wUserSala=true&wAlumnosSala=true&wProfesoresSala=true&wEnlace=true`, {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        });
    },
}