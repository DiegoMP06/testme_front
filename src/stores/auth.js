import { computed, ref } from 'vue';
import {defineStore} from 'pinia'
import {useRouter} from 'vue-router'
import AuthService from '@/services/AuthService';

export const useAuthStore = defineStore('auth', () => {
    const errores =  ref([]);
    const user = ref(null);

    const router = useRouter();  

    const rules = {
        name: {
            required: 'El Nombre es Obligatorio',
            length: 'El Nombre Debe Tener Menos de 60 Caracteres',
        },
        apellido: {
            required: 'El Apellido es Obligatorio',
            length: 'El Apellido Debe Tener Menos de 60 Caracteres',
        },
        usuario: {
            required: 'El Nombre de Usuario es Obligatorio',
            length: 'El Nombre de Usuario Debe Tener Entre 4 y 20 Caracteres',
            matches: 'El Nombre de Usuario No Es Valido'
        },
        email: {
            required: 'El Correo Electronico es Obligatorio',
            email: 'El Correo Electronico No Es Valido',
            length: 'El Email Debe Tener Menos de 60 Caracteres',
        },
        password: {
            required: 'La Contraseña es Obligatoria',
            length: 'La Contraseña Debe Tener Entre 8 y 20 Caracteres',
            contains_symbol: 'La Contraseña debe Tener Al Menos Un Simbolo',
            contains_numeric: 'La Contraseña debe Tener Al Menos Un Numero',
        }
    };

    async function register(data) {
        AuthService.register(data)
            .then(({data}) => {
                localStorage.setItem('AUTH_TOKEN', data.AUTH_TOKEN);
                user.value = data.user;
                router.push({name: 'home.tests'});
            })
            .catch(({response: {data: {errors}}}) => {
                Object.values(errors).forEach(erroresArray => erroresArray.forEach(error => errores.value = [...errores.value, error]));
            });
    }

    function login(data) {
        AuthService.login(data)
            .then(({data}) => {
                localStorage.setItem('AUTH_TOKEN', data.AUTH_TOKEN);
                user.value = data.user;
                router.push({name: 'home.tests'});
            })
            .catch(({response: {data: {errors}}}) => {
                Object.values(errors).forEach(erroresArray => erroresArray.forEach(error => errores.value = [...errores.value, error]));
            });
    }

    function logout() {}

    const isAuth = computed(() => {
        return user.value !== null;
    });

    const isAdmin = computed(() => {
        return user.value.admin === 1;
    });

    const isTeacher = computed(() => {
        return user.value.cargo_id === 2 || user.cargo_id === 3;
    });

    return {
        errores,
        rules,
        register,
        login,
        user,
        isAuth,
        isTeacher,
    };
});