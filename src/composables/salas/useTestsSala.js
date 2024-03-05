import { ref, computed, onMounted, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import { toast } from "vue3-toastify";
import { useAuthStore } from "@/stores/auth";
import EduService from "@/services/EduService";

export default function() {
    const route = useRoute();
    const router = useRouter();
    const authStore = useAuthStore();

    const cargando = ref(false);
    const tests = ref([]);
    const testsPublicos = ref([]);
    const testsUser = ref([]);
    const testsCerrados = ref([]);

    watch(tests, () => {
        testsPublicos.value = tests.value.filter(test => test.publico);
        testsCerrados.value = tests.value.filter(test => !test.publico);
        testsUser.value = tests.value.filter(test => test.user.id === authStore.user.id)
    })

    onMounted(() => {
        cargando.value = true;

        EduService.obtenerTestsSala(route.params.id)
            .then(({data: {data}}) => {
                tests.value = data;
            })
            .catch(() => toast.error('Ha Ocurrido un Error'))
            .finally(() => cargando.value = false);
    });

    const hasTests =  computed(() => {
        return tests.value.length > 0;
    });

    const hasTestsPublicos = computed(() => {
        return testsPublicos.value.length > 0;
    });

    const hasTestsUser = computed(() => {
        return testsUser.value.length > 0;
    });

    const hasTestsCerrados = computed(() => {
        return testsCerrados.value.length > 0;
    });

    return {
        cargando,
        tests,
        testsPublicos,
        testsCerrados,
        testsUser,
        hasTests,
        hasTestsUser,
        hasTestsPublicos,
        hasTestsCerrados,
    };
}