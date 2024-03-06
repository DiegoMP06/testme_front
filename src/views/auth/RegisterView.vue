<script setup>
    import {FormKit} from '@formkit/vue'
    import {useAuthStore} from '@/stores/auth';
    import HeadingAuth from '@/components/utilities/HeadingAuth.vue';
import { reactive } from 'vue';

    const authStore = useAuthStore();
    const user = reactive({
        id: null,
        name: '',
        apellido_paterno: '',
        apellido_materno: '',
        usuario: '',
        email: '',
        password: '',
        password_confirmation: '',
    });

    defineProps({
        heading: {
            type: String,
            required: true,
        }
    });

    const handleSubmit = () => {
        if(user.password !== user.password_confirmation) {
            authStore.errores = ['Las Contraseñas No Coinciden'];
            return;
        }

        authStore.errores = [];
        
        authStore.register(user);
    }
</script>

<template>
    <HeadingAuth>
        {{ heading }}
    </HeadingAuth>

    <FormKit
        type="form"
        submit-label="Crear Cuenta"
        incomplete-message="Revisa Los Mensajes de Error"
        @submit="handleSubmit"
        :value="user"
    >
        <p v-for="error in authStore.errores" class="formkit-message">
            {{ error }}
        </p>

        <FormKit 
            type="text"
            name="name"
            label="Nombre: "
            placeholder="Tu Nombre"
            validation="required|length:0,60"
            v-model="user.name"
            :validation-messages="authStore.rules.name"
        />

        <FormKit 
            type="text"
            name="apellido_paterno"
            label="Apellido Paterno: "
            placeholder="Tu Apellido Paterno"
            validation="required|length:0,60"
            v-model="user.apellido_paterno"
            :validation-messages="authStore.rules.apellido"
        />

        <FormKit 
            type="text"
            name="apellido_materno"
            label="Apellido Materno: "
            placeholder="Tu Apellido Paterno"
            validation="required|length:0,60"
            v-model="user.apellido_materno"
            :validation-messages="authStore.rules.apellido"
        />

        <FormKit 
            type="text"
            name="usuario"
            label="Nombre de Usuario: "
            placeholder="Tu Nombre de Usuario"
            help="Ej. usuario-24"
            validation="required|length:4,20|matches:/^[a-z0-9-]+$/"
            v-model="user.usuario"
            :validation-messages="authStore.rules.usuario"
        />

        <FormKit 
            type="email"
            name="email"
            label="Correo Electronico: "
            placeholder="Tu Correo Electronico"
            validation="required|email|length:0,60"
            v-model="user.email"
            :validation-messages="authStore.rules.email"
        />

        <FormKit 
            type="password"
            name="password"
            label="Contraseña: "
            placeholder="Tu Contraseña"
            validation="required|length:8,20|contains_symbol|contains_numeric|contains_alpha"
            v-model="user.password"
            :validation-messages="authStore.rules.password"
        />

        <FormKit 
            type="password"
            name="password_confirmation"
            label="Repite tu Contraseña: "
            placeholder="Repite tu Contraseña"
            validation="required|length:8,20|contains_symbol|contains_numeric|contains_alpha"
            v-model="user.password_confirmation"
            :validation-messages="authStore.rules.password"
        />
    </FormKit>
</template>