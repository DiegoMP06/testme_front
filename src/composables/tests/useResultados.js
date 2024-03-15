import { formatearMetaLinks } from "@/helpers";
import TestService from "@/services/TestService";
import { ref, reactive, onMounted, computed } from "vue";
import { useRouter, useRoute } from "vue-router";

export default function() {
    const cargando = ref(false)
    const route = useRoute();
    const router = useRouter();
    const respuestas = ref([]);
    const meta = ref({});
    const links = ref({});
    const page = ref(1);

    const busqueda = ref('');
    
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

            const [{data: {data: [dataTest]}}, {data: {data: [dataVersion]}}, {data: dataRespuestas}] = await Promise.all([
                TestService.show(route.params.testId),
                route.name === "dashboard.tests.version.resultados" ? TestService.obtenerVersionResultados(route.params.testId, route.params.versionId) : TestService.obtenerVersionSalaResultados(route.params.versionId, route.params.salaId),
                route.name === "dashboard.tests.version.resultados" ? TestService.obtenerResultados(route.params.versionId) : TestService.obtenerResultadosSala(route.params.versionId, route.params?.salaId),
            ]);

            Object.assign(test, dataTest);

            dataRespuestas.links.links = formatearMetaLinks(dataRespuestas.meta);
            
            respuestas.value = dataRespuestas.data;
            meta.value = dataRespuestas.meta;
            links.value = dataRespuestas.links;
            page.value = meta.value.current_page;

            if(route.name === "dashboard.tests.version.resultados") {
                Object.assign(version, dataVersion);
                return;
            }

            Object.assign(version, dataVersion.test_version);
            version.visitas = dataVersion.visitasSala;
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

    function obtenerResultados(pagina) {
        cargando.value = true;

        route.name === "dashboard.tests.version.resultados" ? TestService.obtenerResultados(route.params.versionId, pagina, busqueda.value) : TestService.obtenerResultadosSala(route.params.versionId, route.params.salaId, pagina, busqueda.value) 
            .then(({data}) => {
                data.links.links = formatearMetaLinks(data.meta);
                respuestas.value = data.data;
                meta.value = data.meta;
                links.value = data.links;
                page.value = meta.value.current_page;
            })
            .catch(() => toast.error('Ha Ocurrido un Error'))
            .finally(() => cargando.value = false);
    }

    const formatearInstrucciones = computed(() => {
        return version.instrucciones.map(({titulo, min, max}) => {
            const numVisitas = version.visitas.filter(({puntuacion}) => puntuacion >= min && puntuacion <= max).length;

            return {
                label: titulo,
                value: numVisitas,
                porcent: (numVisitas / version.visitas.length * 100).toFixed(2),
            }
        });
    })

    const hasResultados = computed(() => {
        return respuestas.value.length > 0;
    });

    const hasVisitas = computed(() => {
        return version.visitas.length > 0;
    });

    return {
        formatearInstrucciones,
        cargando,
        respuestas,
        test,
        busqueda,
        version,
        links,
        meta,
        page,
        obtenerResultados,
        hasResultados,
        hasVisitas,
    };
}