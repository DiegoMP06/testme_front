import { ref, onMounted, reactive, computed } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useAuthStore } from "@/stores/auth";
import UserService from "@/services/UserService";
import { formatearMetaLinks } from "@/helpers";
import { toast } from "vue3-toastify";

export default function() {
    const router = useRouter();
    const route = useRoute();
    const authStore = useAuthStore();

    const cargando = ref(false);
    const page = ref(1);
    const meta = ref({});
    const links = ref({});
    const salas = ref([]);

    onMounted(() => {
        if(route.params.user === authStore.user.usuario) {
            obtenerSalas();
            return; 
        }

        router.push({name: 'not-found'});
    });

    function obtenerSalas(pagina = 1) {
        cargando.value = true;

        UserService.salas(pagina)
            .then(({data}) => {
                data.links.links = formatearMetaLinks(data.meta);

                salas.value = data.data;
                meta.value = data.meta;
                links.value = data.links;
                page.value = meta.value.current_page;
            })
            .catch(() => toast.error('Ha Ocurrido un Error'))
            .finally(() => cargando.value = false);
    }

    const hasSalas = computed(() => {
        return salas.value.length > 0;
    });

    return {
        cargando,
        page,
        meta,
        links,
        salas,
        obtenerSalas,
        hasSalas,
    };
}