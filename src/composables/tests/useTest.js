import { onMounted, ref, reactive, computed } from "vue";
import {useRoute, useRouter} from 'vue-router'
import { toast } from "vue3-toastify";
import Swal from 'sweetalert2'
import TestService from "@/services/TestService";

export default function useTest() {
    const router = useRouter();
    const route = useRoute();
    
    const page = ref(null);
    const cargando = ref(false);

    const test = reactive({
        id: null,
        ultima_version: '',
        user_id: '',
        created_at: '',
        updated_at: '',
        versiones: [],
    });

    onMounted(async () => {
        try {
            cargando.value = true;
            const {data: {data: [data]}} = await TestService.show(route.params.id);
            Object.assign(test, data);
            page.value = test.versiones[test.versiones.length-1].id;
        } catch (error) {
            if(error?.response?.status === 404 || error?.response?.status === 403) {
                router.push({name: 'dashboard.tests'})
            } else {
                toast.error('Ha Ocurrrido un Error');
            }
        } finally {
            cargando.value = false;
        }
    });

    function editarPublico(id) {
        const version = {...test.versiones.find(versionState => versionState.id === id)};
        toast.warn(version.publico ? 'Ocultando Test' : 'Publicando Test');

        TestService.editarVersion(id, test.id, {publico: !version.publico})
            .then(({data: {version: {publico}}}) => {
                version.publico = publico ? 1 : 0;
                test.versiones = test.versiones.map(versionState => versionState.id === id ? version : versionState);

                toast.success(test.publico ? 'Se Oculto el Test' : 'Se Publico el Test');
            })
            .catch(() => {
                toast.error(test.publico ? 'No Se Pudo Ocultar el Test' : 'No Se Pudo Publicar el Test');
            });
    }

    function editarRespuestas(id) {
        const version = {...test.versiones.find(versionState => versionState.id === id)};
        toast.warn(test.respuestas ? 'Ocultando Respuestas del Test' : 'Publicando Respuestas del Test');

        TestService.editarVersion(id, test.id, {respuestas: !version.respuestas})
            .then(({data: {version: {respuestas}}}) => {
                version.respuestas = respuestas ? 1 : 0;
                test.versiones = test.versiones.map(versionState => versionState.id === id ? version : versionState);

                toast.success(test.publico ? 'Se Ocultaron las Respuestas del Test' : 'Se Publicaron las Respuestas del Test');
            })
            .catch(() => {
                toast.error(test.publico ? 'No Se Pudieron Ocultar las Repuestas' : 'No Se Pudieron Publicar las Respuestas');
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

    async function eliminarVersion(id) {
        try {
            await TestService.eliminarVersion(id, test.id);
            test.versiones = test.versiones.filter(version => version.id !== id);
            page.value = test.versiones[test.versiones.length-1].id;

            Swal.fire({
                title: "Eliminado",
                text: "El Test Se Elimino.",
                icon: "success"
            });
        } catch (error) {
            Swal.fire({
                title: "Error",
                text: "La Version No Se Elimino.",
                icon: "error"
            });
        }
    }

    function handleClickEliminarVersion(id) {
        Swal.fire({
            title: "Atencion",
            text: "¿Deseas Eliminar la Version?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Si",
            cancelButtonText: 'No',
        }).then((result) => {
            if (result.isConfirmed) {
                eliminarVersion(id);
            }
        });
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

    function handleClickPage(id) {
        page.value = id;
    }

    const canDeleteVersion = computed(() => {
        return test.versiones.length > 1;
    });

    return {
        cargando,
        page,
        test,
        editarPublico,
        editarRespuestas,
        handleClickEliminarTest,
        handleClickEliminarVersion,
        handleClickPage,
        canDeleteVersion,
    };
}