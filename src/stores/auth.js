import { computed, ref } from 'vue';
import { defineStore } from 'pinia'
import { useRouter, useRoute } from 'vue-router'
import AuthService from '@/services/AuthService';
import { toast } from 'vue3-toastify';
import UIService from '@/services/UIService';

export const useAuthStore = defineStore('auth', () => {
    const errores = ref([]);
    const user = ref(null);
    const cargando = ref(false);

    const router = useRouter();
    const route = useRoute();

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
        cargando.value = true;
        UIService.csrf()
            .then(() => {
                AuthService.register(data)
                    .then(({ data }) => {
                        localStorage.setItem('AUTH_TOKEN', data.AUTH_TOKEN);
                        user.value = data.user;
                        router.push({ name: 'auth.notification-email' });
                    })
                    .catch((error) => {
                        if (error?.response?.status == 422) {
                            Object.values(error.response.data.errors).forEach(erroresArray => erroresArray.forEach(error => errores.value = [...errores.value, error]));
                        } else {
                            toast.error('Ha Ocurrrido un Error');
                        }
                    })
            })
            .catch(() => toast.error('Ha Ocurrido un Error'))
            .finally(() => cargando.value = false);
    }

    function sendEmail() {
        cargando.value = true;
        UIService.csrf().then(() => {
            AuthService.enviarEmail()
                .then(() => toast.success('Se Envio el Email Correctamente'))
                .catch(() => toast.error('Ha Ocurrido un Error'));
        })
        .catch(() => toast.error('Ha Ocurrido un Error'))
        .finally(() => cargando.value = false);
    }

    function login(data) {
        cargando.value = true;
        UIService.csrf()
            .then(() => {
                AuthService.login(data)
                    .then(({ data }) => {
                        localStorage.setItem('AUTH_TOKEN', data.AUTH_TOKEN);
                        user.value = data.user;
                        router.push({ name: 'home.tests' });
                    })
                    .catch((error) => {
                        if (error?.response?.status == 422) {
                            Object.values(error.response.data.errors).forEach(erroresArray => erroresArray.forEach(error => errores.value = [...errores.value, error]));
                        } else {
                            toast.error('Ha Ocurrrido un Error');
                        }
                    });
            })
            .catch(() => toast.error('Ha Ocurrido un Error'))
            .finally(() => cargando.value = false);
    }

    function logout() { 
        cargando.value = true;
        toast.warn("Cargando...");

        UIService.csrf()
            .then(() =>  AuthService.logout()
                .then(() => AuthService.borrarToken()
                    .then(() => {
                        localStorage.removeItem('AUTH_TOKEN');
                        router.push({name: 'auth.login'});
                    })
                    .catch(() => toast.error('Ha Ocurrido un Error'))
                )
                .catch(() => AuthService.borrarToken()
                    .then(() => {
                        localStorage.removeItem('AUTH_TOKEN');
                        router.push({name: 'auth.login'});
                    })
                    .catch(() => toast.error('Ha Ocurrido un Error'))
                )
            )
            .catch(() => toast.error('Ha Ocurrido un Error'))
            .finally(() => cargando.value = false);
    }

    const isAuth = computed(() => {
        return user.value !== null;
    });

    const isAdmin = computed(() => {
        return user.value?.admin === 1;
    });

    const isTeacher = computed(() => {
        return user.value?.cargo_id === 2 || user.value?.cargo_id === 3;
    });

    const isAlumno = computed(() => {
        return user.value?.cargo_id === 1;
    });

    const isVerificado = computed(() => {
        return user.value?.email_verified_at !== null;
    });

    return {
        cargando,
        errores,
        rules,
        register,
        sendEmail,
        login,
        logout,
        user,
        isAdmin,
        isAuth,
        isTeacher,
        isAlumno,
        isVerificado,
    };
});