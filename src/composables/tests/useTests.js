import { onMounted, ref, computed } from "vue";
import { toast } from "vue3-toastify";
import TestService from "@/services/TestService";

export default function useTests() {
    const page = ref(1);
    const tests = ref([]);
    const links = ref({});
    const meta = ref({});
    const cargando = ref(false);

    onMounted(() => {
        obtenerTests();
    });

    const obtenerTests = (pagina = 1) => {
        cargando.value = true;
        page.value = pagina;

        TestService.index(page.value)
        .then(({data}) => {
            data.links.links = data.meta.links.filter(link => link.label !== 'Next &raquo;' && link.label !== '&laquo; Previous');

            tests.value = data.data;
            links.value = data.links;
            meta.value = data.meta;
        })
        .catch(() => toast.error('Ha Ocurrido Un Error'))
        .finally(() => cargando.value = false);
    }

    function editarPublico(id) {
        const test = {...tests.value.find(test => test.id === id)};
        toast.warn(test.version[0].publico ? 'Ocultando Test' : 'Publicando Test');

        TestService.editarVersion(test.version[0].id, {publico: !test.version[0].publico})
            .then(({data: {version: {publico}}}) => {
                test.version[0].publico = publico ? 1 : 0;
                tests.value = tests.value.map(testState => testState.id === id ? test : testState);

                toast.success(test.publico ? 'Se Oculto el Test' : 'Se Publico el Test');
            })
            .catch(() => {
                toast.error(test.publico ? 'No Se Pudo Ocultar el Test' : 'No Se Pudo Publicar el Test');
            });
    }

    const hasTests = computed(() => {
        return tests.value.length > 0;
    });

    return {
        page,
        tests,
        links,
        meta,
        cargando,
        obtenerTests,
        editarPublico,
        hasTests,
    };
}