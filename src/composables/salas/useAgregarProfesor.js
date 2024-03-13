import { ref, computed, reactive, onMounted } from "vue";
import { useRoute } from "vue-router";
import SalaService from "@/services/SalaService";
import { formatearMetaLinks } from "@/helpers";
import Swal from "sweetalert2";
import { toast } from "vue3-toastify";

export default function useAgregarProfesor() {
    const cargando = ref(false);
    const page = ref(1);

    const route = useRoute();

    const links = ref({});
    const meta = ref({});
    const busqueda = ref('');
    const users = ref([]);

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

    onMounted(obtenerDatos);

    function obtenerDatos() {
        cargando.value = true;
        page.value = 1;

        Promise.all([
            SalaService.obtenerProfesores(route.params.id, page.value), 
            SalaService.obtenerSala(route.params.id)
        ])
            .then(([dataProfesores, dataSala]) => {
                dataProfesores.data.links.links = formatearMetaLinks(dataProfesores.data.meta);

                users.value = dataProfesores.data.data;
                meta.value = dataProfesores.data.meta;
                links.value = dataProfesores.data.links;
                Object.assign(sala, dataSala.data.data[0]);
            })
            .catch((error) => {
                if(error?.response?.status === 403) {
                    router.push({name: 'edu.sala.tests', params: {id: route.params.id}})
                } else {
                    toast.error('Ha Ocurrido un error')
                }
            })
            .finally(() => cargando.value = false);
    }

    function obtenerProfesores(pagina = 1) {
        cargando.value = true;

        SalaService.obtenerProfesores(sala.id, pagina, busqueda.value)
            .then((data) => {
                data.data.links.links = formatearMetaLinks(data.data.meta);

                users.value = data.data.data;
                meta.value = data.data.meta;
                links.value = data.data.links;
                page.value = meta.value.current_page;
            })
            .catch(() => {
                if(error?.response?.status === 403) {
                    router.push({name: 'edu.sala.tests', params: {id: route.params.id}})
                } else {
                    toast.error('Ha Ocurrido un error')
                }
            })
            .finally(() => cargando.value = false);
    }

    function enviarSolicitud(id) {
        cargando.value = true;

        SalaService.enviarSolicitud(id, sala.id)
            .then(() => {
                Swal.fire({
                    title: "Exito",
                    text: "Se Envio la Solicitud",
                    icon: "success"
                });
            })
            .catch(() => toast.error('Ocurrio un error'))
            .finally(() => cargando.value = false);
    }


    function handleClickSolicitar(id) {
        const profesor = users.value.find(user => user.id === id);

        Swal.fire({
            title: "Atencion",
            text: `¿Deseas Enviar Solicitud para Profesor a ${profesor.usuario}?`,
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Si",
            cancelButtonText: 'No',
        })
            .then((result) => {
                if (result.isConfirmed) {
                    enviarSolicitud(id);
                }
            });
    }

    const hasUsers = computed(() => {
        return users.value.length > 0;
    });

    return {
        cargando,
        links,
        meta,
        users,
        sala,
        busqueda,
        page,
        handleClickSolicitar,
        obtenerProfesores,
        hasUsers,
    };
}