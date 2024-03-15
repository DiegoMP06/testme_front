import axios from '../config/axios';

export default {
    crearSala(data) {
        return axios.post('/api/salas', data, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('AUTH_TOKEN') ?? ''}`
            },
        })
    },
    obtenerSalas(page) {
        return axios.get(`/api/salas?page=${page}`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('AUTH_TOKEN') ?? ''}`
            },
        });
    },
    obtenerSala(id) {
        return axios.get(`/api/salas/${id}?wAlumnosSala=true&wProfesoresSala=true`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('AUTH_TOKEN') ?? ''}`
            },
        });
    },
    editarSala(id, data) {
        return axios.patch(`/api/salas/${id}`, data, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('AUTH_TOKEN') ?? ''}`,
            }
        });
    },
    eliminarSala(id) {
        return axios.delete(`/api/salas/${id}`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('AUTH_TOKEN') ?? ''}`
            },
        });
    },
    desvincularUsuario(salaId, id) {
        return axios.delete(`/api/salas/${salaId}/user-salas/${id}?wAlumnosSala=true&wProfesoresSala=true`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('AUTH_TOKEN') ?? ''}`,
            }
        });
    },
    obtenerProfesores(id, page = 1, busqueda = '') {
        return axios.post(`/api/salas/${id}/user-salas?page=${page}&wEnlaceUser=true`, {busqueda}, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('AUTH_TOKEN') ?? ''}`,
            }
        });
    },
    enviarSolicitud(userId, salaId) {
        return axios.post(`/api/users/${userId}/salas/${salaId}/solicitud-salas`, null, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('AUTH_TOKEN') ?? ''}`,
            }
        });
    },
    obtenerSolicitud({userId = '', salaId = '', solicitudId = ''}) {
        return axios.get(`/api/users/${userId}/salas/${salaId}/solicitud-salas/${solicitudId}`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('AUTH_TOKEN') ?? ''}`,
            }
        });
    },
    enlazarProfesor({userId = '', salaId = '', solicitudId = ''}) {
        return axios.delete(`/api/users/${userId}/salas/${salaId}/solicitud-salas/${solicitudId}`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('AUTH_TOKEN') ?? ''}`,
            }
        });
    },
    enlazarTest({test_id = '', salaId = ''}) {
        return axios.post(`/api/edu/salas/${salaId}/test-salas`, {test_id}, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('AUTH_TOKEN') ?? ''}`,
            }
        });
    },
    desenlazarTest({id = '', salaId = ''}) {
        return axios.delete(`/api/edu/salas/${salaId}/test-salas/${id}`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('AUTH_TOKEN') ?? ''}`,
            }
        });
    },
}