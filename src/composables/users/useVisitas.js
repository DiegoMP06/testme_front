import { ref, reactive, computed, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useAuthStore } from "@/stores/auth";
import UserService from "@/services/UserService";
import { formatearMetaLinks } from "@/helpers";

export default function() {
    const cargando = ref(false);
    const authStore = useAuthStore();
    const route = useRoute();
    const router = useRouter();

    const visitas = ref([]);
    const pageVisitas = ref(1);
    const metaVisitas = ref({});
    const linksVisitas = ref({});

    onMounted(() => {
        if(route.params.user === authStore.user.usuario) {
            cargando.value = true;

            UserService.visitas()
                .then(({data}) => {
                    data.links.links = formatearMetaLinks(data.meta);
                    
                    metaVisitas.value = data.meta;
                    linksVisitas.value = data.links;
                    visitas.value = data.data;
                })
                .catch((error) => console.log(error))
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
            .catch((error) => console.log(error))
            .finally(() => cargando.value = false);
    }

    return {
        cargando,
        visitas,
        metaVisitas,
        linksVisitas,
        pageVisitas,
        obtenerVisitas,
    };
}