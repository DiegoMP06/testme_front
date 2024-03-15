import { onMounted, ref, reactive, computed } from "vue";
import {useRoute, useRouter} from 'vue-router'
import { toast } from "vue3-toastify";
import { useModalStore } from "@/stores/modal";
import Swal from 'sweetalert2'
import TestService from "@/services/TestService";

export default function() {
    const router = useRouter();
    const route = useRoute();
    const modalStore = useModalStore();
    
    const cargando = ref(false);
    const subCargando = ref(false);

    const selectsCategorias = ref([]);

    const categoria = ref('');
    const nombre = ref('');
    const descripcion = ref('');

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
        categoria: {},
        tipo: {},
        campos: [],
        camposExtra: [],
        instrucciones: []
    });

    onMounted(async () => {
        try {
            cargando.value = true;

            const [{data: {data: [dataTest]}}, {data: {data: dataCategorias}}, {data: {data: [dataVersion]}}] = await Promise.all([
                TestService.show(route.params.testId),
                TestService.obtenerCategorias(),
                TestService.obtenerVersion(route.params.testId, route.params.versionId),
            ]);

            Object.assign(test, dataTest);
            Object.assign(version, dataVersion);

            selectsCategorias.value = [{
                label: '-- Seleccione --',
                value: '',
            }];

            dataCategorias.forEach(({categoria: label, id: value}) => selectsCategorias.value = [...selectsCategorias.value, {label, value}]);
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

    function editarVersionTest(msjs = {warn: '', success: '', error: ''}, data) {
        toast.warn(msjs.warn);
        subCargando.value = true;

        TestService.editarVersion(version.id, test.id, data)
            .then(({data: {data: [dataVersion]}}) => {
                Object.assign(version, dataVersion);
                toast.success(msjs.success);
            })
            .catch(() => toast.error(msjs.error))
            .finally(() => {
                subCargando.value = false;
                quitarModal();
            });
    }

    function quitarModal() {
        categoria.value = '';
        nombre.value = '';
        descripcion.value = '';

        modalStore.handleClickQuitar();
    }

    function editarPublico() {
        editarVersionTest({
            warn: version.publico ? 'Publicando Test' : 'Ocultando Test',
            success: version.publico ? 'Se Publico el Test' : 'Se Oculto el Test',
            error: version.publico ? 'No se Pudo Publicar el Test' : 'No se Pudo Ocultar el Test',
        }, {publico: !version.publico});
    }

    function editarRespuestas() {
        editarVersionTest({
            warn: version.respuestas ? 'Publicando Respuestas del Test' : 'Ocultando Respuestas del Test',
            success: version.respuestas ? 'Se Publicaron las Respuestas del Test' : 'Se Ocultaron las Respuestas del Test',
            error: version.respuestas ? 'No Se Pudo Publicar las Respuestas' : 'No Se Pudo Ocultar las Repuestas',
        }, {respuestas: !version.respuestas});
    }

    async function eliminarVersion(id) {
        try {
            await TestService.eliminarVersion(id, test.id);

            Swal.fire({
                title: "Eliminado",
                text: "El Test Se Elimino.",
                icon: "success"
            }).then(() => {
                router.push({name: 'dashboard.tests.index', params: {id: test.id}});
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

    function handleSubmitNombre() {
        editarVersionTest({
            warn: 'Actualizando Nombre',
            success: 'Se Actualizo el Nombre',
            error: 'No Se Pudo Actualizar el Nombre',
        }, {nombre: nombre.value});
    }

    function handleClickActualizarNombre(id) {
        nombre.value = version.nombre;

        modalStore.handleClickMostrarModal(3.1);
    }

    function handleSubmitDescripcion() {
        editarVersionTest({
            warn: 'Actualizando Descripcion',
            success: 'Se Actualizo la Descripcion',
            error: 'No Se Pudo Actualizar la Descripcion',
        }, {descripcion: version.descripcion});
    }

    function handleClickActualizarDescripcion(id) {
        descripcion.value = version.descripcion;

        modalStore.handleClickMostrarModal(3.2);
    }

    function handleSubmitCategoria() {
        editarVersionTest({
            warn: 'Actualizando Categoria',
            success: 'Se Actualizo la Categoria',
            error: 'No Se Pudo Actualizar la Categoria',
        }, {categoria_id: categoria.value});
    }

    function handleClickActualizarCategoria(id) {
        categoria.value = version.categoria_id;

        modalStore.handleClickMostrarModal(3.3);
    }

    function handleClickActualizarPublico(id) {
        editarPublico();
    }

    function handleClickActualizarRespuestas(id) {
        editarRespuestas();
    }

    const canDeleteVersion = computed(() => {
        return test.versiones > 1;
    });

    const hasCampos = computed(() => {
        return version.campos.length > 0;
    });

    const hasRespuestas = computed(() => {
        return version.respuestas;
    });

    const isExamen = computed(() => {
        return version.tipo_id === 4;
    });

    const isMultiple = computed(() => {
        return version.tipo_id === 3 || version.tipo_id === 4;
    });

    const isPublico = computed(() => {
        return version.publico;
    });

    return {
        cargando,
        subCargando,
        test,
        version,
        selectsCategorias,
        quitarModal,
        nombre,
        descripcion,
        categoria,
        handleSubmitNombre,
        handleClickActualizarNombre,
        handleSubmitDescripcion,
        handleClickActualizarDescripcion,
        handleSubmitCategoria,
        handleClickActualizarCategoria,
        handleClickActualizarPublico,
        handleClickActualizarRespuestas,
        handleClickEliminarVersion,
        canDeleteVersion,
        hasCampos,
        hasRespuestas,
        isMultiple,
        isExamen,
        isPublico,
    };
}