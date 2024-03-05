import { ref, reactive, onMounted, computed } from "vue";
import { useRoute, useRouter } from "vue-router";
import { toast } from 'vue3-toastify';
import Swal from "sweetalert2";
import { useModalStore } from "@/stores/modal";
import EduService from "@/services/EduService";
import { useAuthStore } from "@/stores/auth";

export default function useEduSala() {
    const route = useRoute();
    const router = useRouter();
    const authStore = useAuthStore();
    const modalStore = useModalStore();

    const subCargando = ref(false);
    const cargando = ref(false);
    const errores = ref([]);

    const password = ref('');

    const sala = reactive({
        id: null,
        nombre: '',
        descripcion: '',
        num_alumnos: 0,
        num_profesores: 0,
        publico: 0,
        acceso: 0,
        user_id: '',
        created_at: '',
        updated_at: '',
        user: {},
        enlace: [],
    });

    onMounted(() => {
        cargando.value = true;

        EduService.obtenerSala(route.params.id)
            .then(({ data: { data: [data] } }) => {
                Object.assign(sala, data);
                sala.enlace = data.enlace ?? null;
            })
            .catch(() => toast.error('Ha Ocurrido un error'))
            .finally(() => cargando.value = false);
    });

    function enlazarAlumno() {
        if(sala.publico) {
            cargando.value = true;
        } else {
            subCargando.value = true;
        }

        EduService.registrarEnlaceSala(sala.id, {password: password.value})
            .then(({data: {data: [data]}}) => {
                Object.assign(sala, data);
                
                quitarModal();
            })
            .catch((error) => {
                if(error?.response?.status == 422) {
                    Object.values(error.response.data.errors).forEach(erroresArray => erroresArray.forEach(error => errores.value = [...errores.value, error]));
                } else {
                    toast.error('Ha Ocurrido un Error');
                }
            })
            .finally(() => {
                cargando.value = false;
                subCargando.value = false;
            });
    }

    function eliminarEnlace() {
        cargando.value = true;

        EduService.eliminarEnlace(sala.id, sala.enlace[0].pivot.id)
            .then(({data: {data: [data]}}) => {
                Object.assign(sala, data)
                sala.enlace = null;

                Swal.fire({
                    title: "Exito",
                    text: "Te Has Salido de la Sala.",
                    icon: "success"
                });
            })
            .catch(() => {
                Swal.fire({
                    title: "Error",
                    text: "No Se Pudo Ejecutar la Accion.",
                    icon: "error"
                });
            })
            .finally(() => cargando.value = false);
    }

    function handleClickEnlazar() {
        if (sala.publico) {
            enlazarAlumno();
            return;
        }

        mostrarModalPassword();
    }

    function handleClickEliminarEnlace() {
        Swal.fire({
            title: "Atencion",
            text: "¿Deseas Salir de la Sala?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Si",
            cancelButtonText: 'No',
        }).then((result) => {
            if (result.isConfirmed) {
                eliminarEnlace();
            }
        });
    }

    function quitarModal() {
        password.value = '';
        modalStore.handleClickQuitar();
    }

    function mostrarModalPassword() {
        modalStore.handleClickMostrarModal(4.1);
    }

    function handleSubmitPassword() {
        enlazarAlumno();
    }

    const isEnlazado = computed(() => {
        return sala.enlace;
    });

    const isCreador = computed(() => {
        return sala.user_id === authStore.user.id;
    });

    const canUnirse = computed(() => {
        return sala.alumnos < sala.num_alumnos;
    });

    const isTeacher = computed(() => {
        return sala?.enlace ? sala?.enlace[0]?.pivot?.profesor : null;
    });

    return {
        cargando,
        subCargando,
        errores,
        sala,
        password,
        handleClickEliminarEnlace,
        handleClickEnlazar,
        handleSubmitPassword,
        quitarModal,
        isEnlazado,
        isCreador,
        isTeacher,
        canUnirse,
    };
}