<script setup>
    import {FormKit} from '@formkit/vue'
    import { useAuthStore } from '@/stores/auth';
    import HeadingAuth from '@/components/utilities/HeadingAuth.vue';

    defineProps({
        heading: {
            type: String,
            required: true,
        }
    });

    const authStore = useAuthStore();

    const handleSubmit = (data) => {
        authStore.errores = [];
        authStore.login(data);
    }
</script>

<template>
    <HeadingAuth>
        {{ heading }}
    </HeadingAuth>
    
    <FormKit
        type="form"
        submit-label="Iniciar Sesion"
        incomplete-message="Revisa Los Mensajes de Error"
        @submit="handleSubmit"
    >
        <p v-for="error in authStore.errores" class="formkit-message">
            {{ error }}
        </p>

        <FormKit 
            type="email"
            name="email"
            label="Correo Electronico: "
            placeholder="Tu Correo Electronico"
            validation="required|email"
            :validation-messages="authStore.rules.email"
        />

        <FormKit 
            type="password"
            name="password"
            label="Contraseña: "
            placeholder="Tu Contraseña"
            validation="required"
            :validation-messages="authStore.rules.password"
        />

        <FormKit 
            type="checkbox"
            name="remember"
            label="Recordarme"
            help="¿Deseas Mantener la Sesion Abierta?"
        />
    </FormKit>
</template>