<script setup>
    import {FormKit} from '@formkit/vue'
    import { useAuthStore } from '@/stores/auth';
    import HeadingAuth from '@/components/utilities/HeadingAuth.vue';

    const authStore = useAuthStore();
    
    defineProps({
        heading: {
            type: String,
            required: true,
        }
    });

    const handleSubmit = (data) => {
        authStore.login(data);
    }
</script>

<template>
    <HeadingAuth>
        {{ heading }}
    </HeadingAuth>

    <div class="bg-white mt-20 p-8 shadow-lg max-w-3xl mx-auto">
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
    </div>
</template>