import { ref, computed, reactive, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import { toast } from "vue3-toastify";
import { useAuthStore } from "@/stores/auth";
import UserService from "@/services/UserService";

export default function() {
    const route = useRoute();
    const router = useRouter();
    const authStore = useAuthStore();

    const cargando = ref(false);
    const user = reactive({
        id: null,
        name: "",
        apellido_paterno: "",
        apellido_materno: "",
        usuario: '',
        imagen: '',
        admin: '',
        biografia: '',
        telefono: null,
        email: null,
        cargo_id: '',
        email_verified_at: "",
        created_at: null,
        cargo: {},
        salas: [],
        enlacesSalas: [],
    });

    onMounted(() => {
        cargando.value = true;

        UserService.user(route.params.user)
            .then(({data: {data: [data]}}) => Object.assign(user, data))
            .catch((error) => {
                if(error?.response?.status === 404) {
                    router.push({name: 'not-found'});
                } else {
                    toast.error('Ha Ocurrido un Error');
                }
            })
            .finally(() => cargando.value = false);
    })

    const isProfesor = computed(() => {
        return user.cargo_id === 2 || user.cargo_id === 3;
    });

    const hasSalas = computed(() =>  {
        return user.salas.length > 0;
    });

    const hasEnlacesSalas = computed(() =>  {
        return user.enlacesSalas.length > 0;
    });

    return {
        cargando,
        user,
        isProfesor,
        hasSalas,
        hasEnlacesSalas,
    };
}