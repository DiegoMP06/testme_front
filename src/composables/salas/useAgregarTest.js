import {ref, reactive, onMounted, computed} from 'vue';
import Swal from "sweetalert2";
import { toast } from "vue3-toastify";
import { formatearMetaLinks } from '@/helpers';
import { useRouter, useRoute } from 'vue-router';
import EduService from '@/services/EduService';
import TestService from '@/services/TestService';
import SalaService from '@/services/SalaService';

export default function useAgregarTest() {
    const route = useRoute();
    const router = useRouter();
    const cargando = ref(false);
    const tests = ref([]);
    const links = ref({});
    const meta = ref({});
    const page = ref(1);
    
    onMounted(() => {
        obtenerTests();
    });

    function obtenerTests(pagina = 1) {
        page.value = pagina;
        cargando.value = true;

        TestService.obtenerTestsVersiones(route.params.id, page.value)
            .then(({data}) => {
                data.links.links = formatearMetaLinks(data.meta);

                tests.value = data.data;
                links.value = data.links;
                meta.value = data.meta;
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

    function enlazarTest(test_id) {
        cargando.value = true;

        SalaService.enlazarTest({test_id, salaId: route.params.id})
            .then(() => router.push({name: 'edu.sala.tests', params: {id: route.params.id}}))
            .catch(() => toast.error('Ocurrio un Error'))
            .finally(() => cargando.value = false); 
    }

    function desenlazarTest(id) {
        cargando.value = true,

        SalaService.desenlazarTest({id, salaId: route.params.id})
            .then(() => router.push({name: 'edu.sala.tests', params: {id: route.params.id}}))
            .catch(() => toast.error('Ocurrio un Error'))
            .finally(() => cargando.value = false);
    }

    function handleClickEnlazar(testId) {
        Swal.fire({
            title: "Atencion",
            icon: "warning",
            text: `¿Deseas Agregar este Test a la Sala?`,
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Si",
            cancelButtonText: 'No',
        })
            .then((result) => {
                if (result.isConfirmed) {
                    enlazarTest(testId);
                }
            });
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

    const hasTests = computed(() => {
        return tests.value.length > 0;
    });

    return {
        cargando,
        tests,
        page,
        meta,
        links,
        obtenerTests,
        handleClickEnlazar,
        handleClickDesenlazar,
        hasTests,
        hasTests,
    }
}