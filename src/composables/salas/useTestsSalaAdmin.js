import { ref, computed, onMounted, reactive } from "vue";
import { useRoute, useRouter } from "vue-router";
import { toast } from "vue3-toastify";
import { useAuthStore } from "@/stores/auth";
import EduService from "@/services/EduService";
import Swal from "sweetalert2";
import SalaService from "@/services/SalaService";

export default function() {
    const route = useRoute();
    const router = useRouter();
    const authStore = useAuthStore();

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

    const cargando = ref(false);
    const tests = ref([]);

    onMounted(() => {
        cargando.value = true;

        Promise.all([
            EduService.obtenerTestsSala(route.params.id),
            EduService.obtenerSala(route.params.id),
        ])
            .then(([{data: {data: dataTests}}, {data: {data: [dataSala]}}]) => {
                Object.assign(sala, dataSala);
                tests.value = dataTests;
            })
            .catch(() => toast.error('Ha Ocurrido un Error'))
            .finally(() => cargando.value = false);
    });

    function desenlazarTest(id) {
        cargando.value = true,

        SalaService.desenlazarTest({id, salaId: route.params.id})
            .then(() => {
                Swal.fire({
                    title: 'Exito',
                    text: 'Se Desvinculo el Test',
                    icon: 'success',
                    confirmButtonColor: "#3085d6",
                })
                .then(() => {
                    router.push({name: 'dashboard.salas.index', params: {id: sala.id}});
                })
            })
            .catch(() => toast.error('Ocurrio un Error'))
            .finally(() => cargando.value = false);
    }
    
    function handleClickDesenlazar(testId) {
        Swal.fire({
            title: "Atencion",
            text: `¿Deseas Desvincular este Test de la Sala?`,
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Si",
            cancelButtonText: 'No',
        })
            .then((result) => {
                if (result.isConfirmed) {
                    desenlazarTest(testId);
                }
            });
    }

    const hasTests =  computed(() => {
        return tests.value.length > 0;
    });

    return {
        cargando,
        sala,
        tests,
        handleClickDesenlazar,
        hasTests,
    };
}