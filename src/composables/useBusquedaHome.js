import { onMounted, ref, reactive, computed } from "vue";
import { useRoute } from "vue-router";
import { toast } from "vue3-toastify";
import HomeService from "@/services/HomeService";
import TestService from "@/services/TestService";

export default function useBusquedaHome() {
    const route = useRoute();

    const cargando = ref(false);
    const tests = ref([]);
    const salas = ref([]);
    const categorias = ref([]);
    const tipos = ref([]);
    const links = ref({});
    const meta = ref({});
    const page = ref(1);

    const busquedaTests = reactive({
        busqueda: '',
        tipo_id: '',
        categoria_id: '',
    });

    const busquedaSalas = reactive({
        busqueda: '',
    });

    onMounted(() => {
        cargando.value = true;
        if(route.name === 'home.tests') {
            Promise.all([
                TestService.obtenerCategorias(),
                TestService.obtenerTipos(),
                HomeService.tests(busquedaTests, page.value),
            ])
                .then(([dataCategorias, dataTipos, dataTests]) => {
                    dataTests.data.links.links = dataTests.data.meta.links.filter(link => link.label !== 'Next &raquo;' && link.label !== '&laquo; Previous');

                    categorias.value = dataCategorias.data.data;
                    tipos.value = dataTipos.data.data;
                    tests.value = dataTests.data.data;
                    links.value = dataTests.data.links;
                    meta.value = dataTests.data.meta;
                })
                .catch(() => {
                    toast.error('Ha Ocurrido Un Error al Consultar los Datos');
                })
                .finally(() => cargando.value = false);
        } else {
            buscarSalas();
        }
    });

    function buscarTests(pagina = 1) {
        cargando.value = true;

        page.value = pagina;

        HomeService.tests(busquedaTests, page.value)
            .then(({data}) => {
                data.links.links = data.meta.links.filter(link => link.label !== 'Next &raquo;' && link.label !== '&laquo; Previous');

                links.value = data.links;
                meta.value = data.meta;
                tests.value = data.data;
            })
            .catch(() => {
                toast.error('Ha Ocurrido Un Error');
            })
            .finally(() => cargando.value = false);
    }

    function buscarSalas() {
        cargando.value = true;

        HomeService.salas(busquedaSalas)
        .then(({data}) => {
            data.links.links = data.meta.links.filter(link => link.label !== 'Next &raquo;' && link.label !== '&laquo; Previous');

            links.value = data.links;
            meta.value = data.meta;
            salas.value = data.data;
        })
        .catch(() => toast.error('Ocurrio Un Error'))
        .finally(() => cargando.value = false);
    }

    function handleClickBuscar() {
        
        if(route.name === 'home.tests') {
            buscarTests();
        } else {
            buscarSalas();
        }
    }

    const hasTests = computed(() => {
        return tests.value.length > 0;
    });

    const hasSalas = computed(() => {
        return salas.value.length > 0;
    });

    return {
        cargando,
        links,
        meta,
        page,
        busquedaTests,
        busquedaSalas,
        buscarTests,
        buscarSalas,
        handleClickBuscar,
        categorias,
        tipos,
        tests,
        salas,
        hasSalas,
        hasTests,
    };
}