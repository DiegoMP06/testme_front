import {ref, computed, onMounted} from 'vue'
import { useRoute } from 'vue-router';
import EduService from '@/services/EduService';
import { toast } from 'vue3-toastify';

export default function() {
    const cargando = ref(false);
    const profesores = ref([]);
    const route = useRoute();

    onMounted(() => {
        cargando.value = true,

        EduService.obtenerUsuariosSala(route.params.id, true)
            .then(({data: {data}}) => profesores.value = data)
            .catch(() => toast.error('Ha Ocurrido un Error'))
            .finally(() => cargando.value = false);
    });

    const hasProfesores = computed(() => {
        return profesores.value.length > 0;
    });

    return {
        cargando, 
        profesores,
        hasProfesores,
    };
}