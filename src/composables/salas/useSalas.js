import SalaService from "@/services/SalaService";
import { onMounted, ref, computed } from "vue";


export default function useSalas() {
    const page = ref(1);
    const salas = ref([]);
    const links = ref({});
    const meta = ref({});
    const cargando = ref(false);

    onMounted(() => {
        obtenerSalas();
    });

    function obtenerSalas(pagina = 1) {
        cargando.value = true;
        page.value = pagina;

        SalaService.obtenerSalas(page.value)
            .then(({data}) => {
                data.links.links = data.meta.links.filter(link => link.label !== 'Next &raquo;' && link.label !== '&laquo; Previous');

                salas.value = data.data;
                links.value = data.links;
                meta.value = data.meta;
            })
            .catch(error => console.log(error))
            .finally(() => cargando.value = false);
    }

    const hasSalas = computed(() => {
        return salas.value.length > 0;
    });

    return {
        page,
        salas,
        links,
        meta,
        cargando,
        obtenerSalas,
        hasSalas,
    };
}