import { ref, reactive, computed, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useAuthStore } from "@/stores/auth";
import UserService from "@/services/UserService";
import { formatearMetaLinks } from "@/helpers";
import { toast } from "vue3-toastify";

export default function() {
    const cargando = ref(false);
    const authStore = useAuthStore();
    const route = useRoute();
    const router = useRouter();

    const visitas = ref([]);
    const pageVisitas = ref(1);
    const metaVisitas = ref({});
    const linksVisitas = ref({});

    const visitasSalas = ref([]);
    const pageVisitasSalas = ref(1);
    const metaVisitasSalas = ref({});
    const linksVisitasSalas = ref({});

    onMounted(() => {
        if(route.params.user === authStore.user.usuario) {
            cargando.value = true;

            Promise.all([
                UserService.visitas(),
                UserService.visitasSalas(),
            ])
                .then(([{data: dataVisitas}, {data: dataVisitasSalas}]) => {
                    dataVisitas.links.links = formatearMetaLinks(dataVisitas.meta);
                    dataVisitasSalas.links.links = formatearMetaLinks(dataVisitasSalas.meta);
                    
                    metaVisitas.value = dataVisitas.meta;
                    linksVisitas.value = dataVisitas.links;
                    visitas.value = dataVisitas.data;
                    
                    metaVisitasSalas.value = dataVisitasSalas.meta;
                    linksVisitasSalas.value = dataVisitasSalas.links;
                    visitasSalas.value = dataVisitasSalas.data;
                })
                .catch(() => toast.error('Ha Ocurrido un Error'))
                .finally(() => cargando.value = false);
            return; 
        }

        router.push({name: 'not-found'});
    });

    function obtenerVisitas(page = 1) {
        pageVisitas.value = page;
        cargando.value = true;

        UserService.visitas(page)
            .then(({data}) => {
                data.links.links = formatearMetaLinks(data.meta);
                
                metaVisitas.value = data.meta;
                linksVisitas.value = data.links;
                visitas.value = data.data;
            })
            .catch(() => toast.error('Ha Ocurrido un Error'))
            .finally(() => cargando.value = false);
    }

    function obtenerVisitasSalas(page = 1) {
        pageVisitasSalas.value = page;
        cargando.value = true;

        UserService.visitasSalas(page)
            .then(({data}) => {
                data.links.links = formatearMetaLinks(data.meta);
                
                metaVisitasSalas.value = data.meta;
                linksVisitasSalas.value = data.links;
                visitasSalas.value = data.data;
            })
            .catch(() => toast.error('Ha Ocurrido un Error'))
            .finally(() => cargando.value = false);
    }

    const hasVisitas = computed(() => {
        return visitas.value.length > 0;
    });

    const hasVisitasSalas = computed(() => {
        return visitasSalas.value.length > 0;
    });

    return {
        cargando,
        visitas,
        metaVisitas,
        linksVisitas,
        pageVisitas,
        obtenerVisitas,
        visitasSalas,
        metaVisitasSalas,
        linksVisitasSalas,
        pageVisitasSalas,
        obtenerVisitasSalas,
        hasVisitas,
        hasVisitasSalas,
    };
}