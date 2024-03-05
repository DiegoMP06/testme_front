import { ref, computed, reactive, onMounted } from "vue";
import {useRoute, useRouter} from 'vue-router';
import { useAuthStore } from "@/stores/auth";
import SalaService from "@/services/SalaService";
import { toast } from "vue3-toastify";

export default function useAceptarSolicitud() {
    const cargando = ref(false);
    const route = useRoute();
    const router = useRouter();
    const authStore = useAuthStore();

    const solicitud = reactive({
        id: null,
        user_id: '',
        sala_id: '',
    });

    const sala = reactive({
        id: null,
        nombre: '',
        descripcion: '',
        num_alumnos: '',
        num_profesores: '',
    });

    onMounted(() => {
        cargando.value = true;

        SalaService.obtenerSolicitud({salaId: route.params.salaId, solicitudId: route.params.solicitudId, userId: authStore.user.id})
            .then(({data: {data: [data]}}) => {
                Object.assign(sala, data.sala)
                solicitud.id = data.id;
                solicitud.user_id = data.user_id;
                solicitud.sala_id = data.sala_id;
            })
            .catch(() => toast.error('Enlace Invalido'))
            .finally(() => cargando.value = false);
    });

    function enlazarProfesor() {
        cargando.value = true;

        SalaService.enlazarProfesor({salaId: sala.id, solicitudId: solicitud.id, userId: authStore.user.id})
            .then(() => router.push({name: 'edu.sala.tests', params: {id: sala.id}}))
            .catch(() => {
                if(error?.response?.status === 403) {
                    router.push({name: 'edu.sala.tests', params: {id: route.params.id}})
                } else {
                    toast.error('Ha Ocurrido un error')
                }
            })
            .finally(() => cargando.value = false);
    }

    const canUnirse = computed(() => {
        return sala.id !== null;
    });

    return {
        cargando,
        solicitud,
        sala,
        enlazarProfesor,
        canUnirse,
    };
}