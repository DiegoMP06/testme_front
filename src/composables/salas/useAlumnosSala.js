import {ref, computed, onMounted} from 'vue'
import { useRoute } from 'vue-router';
import EduService from '@/services/EduService';
import { toast } from 'vue3-toastify';

export default function() {
    const cargando = ref(false);
    const alumnos = ref([]);
    const route = useRoute();

    onMounted(() => {
        cargando.value = true,

        EduService.obtenerUsuariosSala(route.params.id)
            .then(({data: {data}}) => alumnos.value = data)
            .catch(() => toast.error('Ha Ocurrido un Error'))
            .finally(() => cargando.value = false);
    });

    const hasAlumnos = computed(() => {
        return alumnos.value.length > 0;
    });

    return {
        cargando, 
        alumnos,
        hasAlumnos,
    };
}