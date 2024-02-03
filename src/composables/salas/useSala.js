import {computed, ref, reactive, onMounted} from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { toast } from 'vue3-toastify';
import SalaService from '@/services/SalaService';
import { useModalStore } from '@/stores/modal';

export default function useSala() {
    const route = useRoute();
    const router = useRouter();
    const modalStore = useModalStore();
    const nombre = ref('');
    const descripcion = ref('');
    const numAlumnos = ref('');
    const numProfesores = ref('');
    const password = ref('');
    const subCargando = ref(false);

    const cargando = ref(false);

    const sala = reactive({
        id: null,
        nombre: '',
        descripcion: '',
        num_alumnos: '',
        num_profesores: '',
        publico: 0,
        acceso: 0,
        user_id: '',
        created_at: '',
        updated_at: '',
    });

    onMounted(() => {
        cargando.value = true;

        SalaService.obtenerSala(route.params.id)
            .then(({data: {data: [data]}}) => Object.assign(sala, data))
            .catch((error) => {
                if(error?.response?.status === 404 || error?.response?.status === 403) {
                    router.push({name: 'dashboard.tests'})
                } else {
                    toast.error('Ha Ocurrrido un Error');
                }
            })
            .finally(() => cargando.value = false);
    });

    function actualizarSala(data, msjs) {
        toast.warn(msjs.warn);
        subCargando.value = true;

        SalaService.editarSala(sala.id, data)
            .then(({data: {data: [data]}}) => Object.assign(sala, data))
            .catch(() => toast.error(msjs.error))
            .finally(() => {
                toast.success(msjs.success);
                subCargando.value = false
                quitarModal();
            });
    }

    function quitarModal() {
        nombre.value = '';
        descripcion.value = '';
        numAlumnos.value = '';
        numProfesores.value = '';
        password.value = '';

        modalStore.handleClickQuitar();
    }

    function handleClickActualizarNombre() {
        nombre.value = sala.nombre,
        modalStore.handleClickMostrarModal(2.1);
    }

    function handleSubmitNombre() {
        actualizarSala({nombre: nombre.value}, {
            warn: 'Se Esta Actualizando El Nombre',
            error: 'No Se Pudo Acualizar El Nombre',
            success: 'Se Actualizo El Nombre'
        });
    }

    function handleClickActualizarDescripcion() {
        descripcion.value = sala.descripcion,
        modalStore.handleClickMostrarModal(2.2);
    }

    function handleSubmitDescripcion() {
        actualizarSala({descripcion: descripcion.value}, {
            warn: 'Se Esta Actualizando La Descripcion',
            error: 'No Se Pudo Acualizar La Descripcion',
            success: 'Se Actualizo La Descripcion'
        });
    }

    function handleClickActualizarNumAlumnos() {
        numAlumnos.value = sala.num_alumnos,
        modalStore.handleClickMostrarModal(2.3);
    }

    function handleSubmitNumAlumnos() {
        actualizarSala({num_alumnos: parseInt(numAlumnos.value)}, {
            warn: 'Se Esta Actualizando La Cantidad De Alumnos',
            error: 'No Se Pudo Acualizar La Cantidad De Alumnos',
            success: 'Se Actualizo La Cantidad De Alumnos'
        });
    }

    function handleClickActualizarNumProfesores() {
        numProfesores.value = sala.num_profesores,
        modalStore.handleClickMostrarModal(2.4);
    }

    function handleSubmitNumProfesores() {
        const num_profesores = numProfesores.value ? parseInt(numProfesores.value) : 0;
        actualizarSala({num_profesores}, {
            warn: 'Se Esta Actualizando La Cantidad De Profesores',
            error: 'No Se Pudo Acualizar La Cantidad De Profesores',
            success: 'Se Actualizo La Cantidad De Profesores'
        });
    }

    function handleClickActualizarPublico() {
        if(sala.publico) {
            modalStore.handleClickMostrarModal(2.5);
        } else {
            actualizarSala({publico: true}, {
                warn: 'Se Esta Publicando La Sala',
                error: 'No Se Pudo Publicar La Sala',
                success: 'Se Publico La Sala'
            });
        }
    }

    function handleSubmitOcultarSala() {
        actualizarSala({password: password.value, publico: false}, {
            warn: 'Se Esta Dejando de Publicar La Sala',
            error: 'No Se Pudo Dejar de Publicar La Sala',
            success: 'Se Dejo de Publicar La Sala'
        });
    }

    function handleClickActualizarPassword() {
        modalStore.editando = true;
        modalStore.handleClickMostrarModal(2.6);
    }

    function handleSubmitPassword() {
        actualizarSala({password: password.value}, {
            warn: 'Se Esta Actualizando La Clave de La Sala',
            error: 'No Se Pudo Acualizar La Clave de La Sala',
            success: 'Se Actualizo La Clave de La Sala'
        });
    }

    function handleClickActualizarAcceso() {
        actualizarSala({acceso: !sala.acceso}, {
            warn: 'Se Esta Actualizando El Acceso a La Sala',
            error: 'No Se Pudo Acualizar El Accesp a La Sala',
            success: 'Se Actualizo El Acceso a La Sala'
        });
    }

    const hasNumProfesores = computed(() => {
        return sala.num_profesores > 0;
    });

    const isPublico = computed(() => {
        return sala.publico;
    });

    const isAcceso = computed(() => {
        return sala.acceso;
    });

    return {
        cargando,
        subCargando,
        sala,
        nombre,
        descripcion,
        numAlumnos,
        numProfesores,
        password,
        quitarModal,
        handleClickActualizarNombre,
        handleSubmitNombre,
        handleClickActualizarDescripcion,
        handleSubmitDescripcion,
        handleClickActualizarNumAlumnos,
        handleSubmitNumAlumnos,
        handleClickActualizarNumProfesores,
        handleSubmitNumProfesores,
        handleClickActualizarPublico,
        handleSubmitOcultarSala,
        handleClickActualizarPassword,
        handleSubmitPassword,
        handleClickActualizarAcceso,
        hasNumProfesores,
        isPublico,
        isAcceso,
    };
}