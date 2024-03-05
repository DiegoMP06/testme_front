import {computed, ref, reactive, onMounted} from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { toast } from 'vue3-toastify';
import SalaService from '@/services/SalaService';
import Swal from 'sweetalert2';
import { useModalStore } from '@/stores/modal';
import EduService from '@/services/EduService';

export default function useSala() {
    const route = useRoute();
    const router = useRouter();
    const modalStore = useModalStore();

    const subCargando = ref(false);
    const cargando = ref(false);
    const profesores = ref([]);
    const alumnos = ref([]);

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

        Promise.all([
            SalaService.obtenerSala(route.params.id),
            EduService.obtenerUsuariosSala(route.params.id, route.name === 'dashboard.salas.profesores'),
        ])
            .then(([{data: {data: [dataSala]}}, {data: {data: dataUsuarios}}]) => {
                Object.assign(sala, dataSala);
                
                if(route.name === 'dashboard.salas.profesores') profesores.value = dataUsuarios;
                else alumnos.value = dataUsuarios;
            })
            .catch((error) => {
                if(error?.response?.status === 404 || error?.response?.status === 403) {
                    router.push({name: 'dashboard.tests'})
                } else {
                    toast.error('Ha Ocurrrido un Error');
                }
            })
            .finally(() => cargando.value = false);
    });

    function handleClickDesvincular(usuario) {
        Swal.fire({
            title: "Atencion",
            text: `¿Deseas Desvincular a ${usuario.usuario}?`,
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Si",
            cancelButtonText: 'No',
        }).then((result) => {
            if (result.isConfirmed) {
                desvincularUsuario(usuario.pivot.id)
            }
        });
    }

    function desvincularUsuario(id) {
        cargando.value = true;

        SalaService.desvincularUsuario(sala.id, id)
            .then(({data: {dataSala: [dataSala], dataUsuarios}}) => {
                Object.assign(sala, dataSala);
                if(route.name === 'dashboard.salas.profesores') profesores.value = dataUsuarios;
                else alumnos.value = dataUsuarios;
            })
            .catch(() => {
                Swal.fire({
                    title: "Error",
                    text: "No se Pudo Ejecutar la Accion.",
                    icon: "error"
                });
            })
            .finally(() => cargando.value = false);
    }

    const hasAlumnos = computed(() => {
        return alumnos.value.length > 0;
    });

    const hasProfesores = computed(() => {
        return profesores.value.length > 0;
    });

    const canAddProfesor = computed(() => {
        return sala.profesores < sala.num_profesores;
    });

    return {
        cargando,
        sala,
        alumnos,
        profesores,
        handleClickDesvincular,
        hasAlumnos,
        hasProfesores,
        canAddProfesor,
    };
}