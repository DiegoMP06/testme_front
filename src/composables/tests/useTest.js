import { onMounted, ref, reactive, computed } from "vue";
import {useRoute, useRouter} from 'vue-router'
import { toast } from "vue3-toastify";
import { useModalStore } from "@/stores/modal";
import Swal from 'sweetalert2'
import TestService from "@/services/TestService";

export default function useTest() {
    const router = useRouter();
    const route = useRoute();
    const modalStore = useModalStore();
    
    const page = ref(null);
    const cargando = ref(false);
    const subCargando = ref(false);

    const selectsCategorias = ref([]);

    const test = reactive({
        id: null,
        ultima_version: '',
        user_id: '',
        created_at: '',
        updated_at: '',
        versiones: [],
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
    });

    onMounted(async () => {
        try {
            cargando.value = true;
            const [{data: {data: [dataTest]}}, {data: {data: dataCategorias}}] = await Promise.all([
                TestService.show(route.params.id),
                TestService.obtenerCategorias(),
            ]);

            Object.assign(test, dataTest);
            page.value = test.versiones[test.versiones.length-1].id;

            selectsCategorias.value = [{
                label: '-- Seleccione --',
                value: '',
            }];

            dataCategorias.forEach(({categoria: label, id: value}) => selectsCategorias.value = [...selectsCategorias.value, {label, value}]);
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

    function editarVersionTest(msjs = {warn: '', success: '', error: ''}) {
        toast.warn(msjs.warn);
        subCargando.value = true;

        TestService.editarVersion(version.id, test.id, version)
            .then(({data: {data: [dataVersion]}}) => {
                Object.assign(version, dataVersion);
                test.versiones = test.versiones.map(versionState => versionState.id === dataVersion.id ? {...version} : versionState);
                toast.success(msjs.success);
            })
            .catch(() => toast.error(msjs.error))
            .finally(() => {
                subCargando.value = false;
                quitarModal();
            });
    }

    function quitarModal() {
        Object.assign(version, {
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
        });

        modalStore.handleClickQuitar();
    }

    function editarPublico() {
        version.publico = !version.publico;

        editarVersionTest({
            warn: version.publico ? 'Publicando Test' : 'Ocultando Test',
            success: version.publico ? 'Se Publico el Test' : 'Se Oculto el Test',
            error: version.publico ? 'No se Pudo Publicar el Test' : 'No se Pudo Ocultar el Test',
        });
    }

    function editarRespuestas() {
        version.respuestas = !version.respuestas;

        editarVersionTest({
            warn: version.respuestas ? 'Publicando Respuestas del Test' : 'Ocultando Respuestas del Test',
            success: version.respuestas ? 'Se Publicaron las Respuestas del Test' : 'Se Ocultaron las Respuestas del Test',
            error: version.respuestas ? 'No Se Pudo Publicar las Respuestas' : 'No Se Pudo Ocultar las Repuestas',
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

    function handleSubmitNombre() {
        editarVersionTest({
            warn: 'Actualizando Nombre',
            success: 'Se Actualizo el Nombre',
            error: 'No Se Pudo Actualizar el Nombre',
        });
    }

    function handleClickActualizarNombre(id) {
        Object.assign(version, {...test.versiones.find(versionState => versionState.id === id)});

        modalStore.handleClickMostrarModal(3.1);
    }

    function handleSubmitDescripcion() {
        editarVersionTest({
            warn: 'Actualizando Descripcion',
            success: 'Se Actualizo la Descripcion',
            error: 'No Se Pudo Actualizar la Descripcion',
        });
    }

    function handleClickActualizarDescripcion(id) {
        Object.assign(version, {...test.versiones.find(versionState => versionState.id === id)});

        modalStore.handleClickMostrarModal(3.2);
    }

    function handleSubmitCategoria() {
        editarVersionTest({
            warn: 'Actualizando Categoria',
            success: 'Se Actualizo la Categoria',
            error: 'No Se Pudo Actualizar la Categoria',
        });
    }

    function handleClickActualizarCategoria(id) {
        Object.assign(version, {...test.versiones.find(versionState => versionState.id === id)});

        modalStore.handleClickMostrarModal(3.3);
    }

    function handleClickActualizarPublico(id) {
        Object.assign(version, {...test.versiones.find(versionState => versionState.id === id)});

        editarPublico();
    }

    function handleClickActualizarRespuestas(id) {
        Object.assign(version, {...test.versiones.find(versionState => versionState.id === id)});

        editarRespuestas();
    }

    function handleClickPage(id) {
        page.value = id;
    }

    const canDeleteVersion = computed(() => {
        return test.versiones.length > 1;
    });

    return {
        cargando,
        subCargando,
        page,
        test,
        version,
        selectsCategorias,
        quitarModal,
        handleSubmitNombre,
        handleClickActualizarNombre,
        handleSubmitDescripcion,
        handleClickActualizarDescripcion,
        handleSubmitCategoria,
        handleClickActualizarCategoria,
        handleClickActualizarPublico,
        handleClickActualizarRespuestas,
        handleClickEliminarTest,
        handleClickEliminarVersion,
        handleClickPage,
        canDeleteVersion,
    };
}