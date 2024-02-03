import { ref, reactive, onMounted, computed } from "vue";
import { useRoute, useRouter } from "vue-router";
import { toast } from 'vue3-toastify';
import EduService from "@/services/EduService";
import { useAuthStore } from "@/stores/auth";

export default function useEduSala() {
    const route = useRoute();
    const router = useRouter();
    const authStore = useAuthStore();

    const cargando = ref(false);
    const page = ref(1);

    const sala = reactive({
        id: null,
        nombre: '',
        descripcion: '',
        num_alumnos: 0,
        num_profesores: 0,
        publico: 0,
        acceso: 0,
        user_id: '',
        created_at: '',
        updated_at: '',
        user: {},
        profesores: [],
        alumnos: [],
        enlace: {},
    });

    onMounted(() => {
        cargando.value = true;

        EduService.obtenerSala(route.params.id)
            .then(({data: {data: [data]}}) => {
                Object.assign(sala, data);
            })
            .catch((error) => console.log(error))
            .finally(() => cargando.value = false);
    });

    return {
        cargando,
        page,
        sala,
    };
}