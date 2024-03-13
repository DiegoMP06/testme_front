import { onMounted, ref, reactive, computed } from "vue";
import { useRoute, useRouter } from 'vue-router'
import { toast } from "vue3-toastify";
import Swal from 'sweetalert2'
import TestService from "@/services/TestService";
import { formatearMetaLinks } from "@/helpers";

export default function useTest() {
    const router = useRouter();
    const route = useRoute();

    const page = ref(1);
    const cargando = ref(false);
    const meta = ref({});
    const links = ref({});

    const versiones = ref([]);

    onMounted(() => {
        obtenerVersiones();
    });

    async function obtenerVersiones(pagina = 1) {
        try {
            cargando.value = true;

            const { data: dataVersiones } = await TestService.obtenerVersiones(route.params.id, pagina);
            dataVersiones.links.links = formatearMetaLinks(dataVersiones.meta);

            versiones.value = dataVersiones.data;
            meta.value = dataVersiones.meta;
            links.value = dataVersiones.links;
            page.value = meta.value.current_page;
        } catch (error) {
            if (error?.response?.status === 404 || error?.response?.status === 403) {
                router.push({ name: 'dashboard.tests' })
            } else {
                toast.error('Ha Ocurrido un Error');
            }
        } finally {
            cargando.value = false;
        }
    }


    function handleClickEliminarTest() {
        Swal.fire({
            title: "Atencion",
            text: "¿Deseas Eliminar el Test?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Si",
            cancelButtonText: 'No',
        }).then((result) => {
            if (result.isConfirmed) {
                eliminarTest();
            }
        });
    }
    
    async function eliminarTest() {
        try {
            await TestService.eliminar(test.id);

            Swal.fire({
                title: "Eliminado",
                text: "El Test Se Elimino.",
                icon: "success"
            }).then(() => {
                router.push({name: 'dashboard.tests'});
            });
        } catch (error) {
            Swal.fire({
                title: "Error",
                text: "El Test No Se Elimino.",
                icon: "error"
            });
        }
    }

    return {
        cargando,
        versiones,
        meta,
        links,
        page,
        obtenerVersiones,
        handleClickEliminarTest,
    };
}