import {ref, computed, onMounted, reactive} from 'vue';
import TestService from '@/services/TestService';
import { useRoute, useRouter } from 'vue-router';

export default function() {
    const route = useRoute()
    const router = useRouter()
    const cargando = ref(false);

    const test = reactive({
        id: null,
        ultima_version: '',
        user_id: '',
        created_at: '',
        updated_at: '',
        versiones: '',
    });

    const version =  reactive({
        id: null,
        nombre: '',
        descripcion: '',
        respuestas: 0,
        publico: 0,
        version: '',
        test_id: '',
        categoria_id: '',
        tipo_id: '',
        created_at: '',
        updated_at: '',
        instrucciones: [],
        visitas: [],
    });

    const visita = reactive({
        id: null,
        puntuacion: '',
        user_id: '',
        test_version_id: '',
        created_at: '',
        updated_at: '',
        respuestas: [],
        user: {},
    });

    onMounted(async () => {
        try {
            cargando.value = true;

            const [{data: {data: [dataTest]}}, {data: {data: [dataVersion]}}, {data: {data: [dataRespuesta]}}] = await Promise.all([
                TestService.show(route.params.testId),
                TestService.obtenerVersion(route.params.testId, route.params.versionId),
                TestService.obtenerResultado(route.params.versionId, route.params.visitaId),
            ]);

            Object.assign(test, dataTest);
            Object.assign(version, dataVersion);
            Object.assign(visita, dataRespuesta);
        } catch (error) {
            if(error?.response?.status === 404 || error?.response?.status === 403) {
                router.push({name: 'dashboard.tests.index', params: {id: route.params.testId}})
            } else {
                toast.error('Ha Ocurrido un Error');
            }
        } finally {
            cargando.value = false;
        }
    });

    const isExamen = computed(() => {
        return version.tipo_id === 4;
    });

    const isMultiple = computed(() => {
        return version.tipo_id === 3 || version.tipo_id === 4;
    });

    return {
        cargando,
        test,
        version,
        visita,
        isExamen,
        isMultiple,
    };
}