import { ref, reactive, onMounted, computed } from "vue";
import { useRouter, useRoute } from "vue-router";
import { toast } from "vue3-toastify";
import { formatearMetaLinks } from "@/helpers";
import TestService from "@/services/TestService";

export default function() {
    const cargando = ref(false)
    const route = useRoute();
    const router = useRouter();
    const meta = ref({});
    const links = ref({});
    const page = ref(1);
    const salas = ref([]);

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

    onMounted(async () => {
        try {
            cargando.value = true;

            const [{data: {data: [dataTest]}}, {data: {data: [dataVersion]}}, {data: dataTestSalas}] = await Promise.all([
                TestService.show(route.params.testId),
                TestService.obtenerVersionResultados(route.params.testId, route.params.versionId),
                TestService.obtenerTestSalas(route.params.versionId),
            ]);

            Object.assign(test, dataTest);
            Object.assign(version, dataVersion);

            dataTestSalas.links.links = formatearMetaLinks(dataTestSalas.meta);

            salas.value = dataTestSalas.data;
            meta.value = dataTestSalas.meta;
            links.value = dataTestSalas.links;
            page.value = meta.value.current_page;
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

    function obtenerTestSalas(pagina = 1) {
        cargando.value = true;

        TestService.obtenerTestSalas(version.id, pagina)
            .then(({data}) => {
                data.links.links = formatearMetaLinks(data.meta);

                salas.value = data.data;
                meta.value = data.meta;
                links.value = data.links;
                page.value = meta.value.current_page;
            })
            .catch((error) => {
                if(error?.response?.status === 404 || error?.response?.status === 403) {
                    router.push({name: 'dashboard.tests.index', params: {id: route.params.testId}})
                } else {
                    toast.error('Ha Ocurrido un Error');
                }
            })
            .finally(() => cargando.value = false);
    }

    const hasSalas = computed(() => {
        return salas.value.length > 0;
    });

    return {
        cargando,
        salas,
        test,
        version,
        page,
        meta,
        links,
        obtenerTestSalas,
        hasSalas,
    };
}