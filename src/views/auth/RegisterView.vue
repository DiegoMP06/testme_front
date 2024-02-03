<script setup>
    import {FormKit} from '@formkit/vue'
    import {useAuthStore} from '@/stores/auth';
    import HeadingAuth from '@/components/utilities/HeadingAuth.vue';

    const authStore = useAuthStore();

    defineProps({
        heading: {
            type: String,
            required: true,
        }
    });

    const handleSubmit = (data) => {
        if(data.password !== data.password_confirmation) {
            authStore.errores = ['Las Contraseñas No Coinciden'];
            return;
        }

        authStore.errores = [];
        
        authStore.register(data);
    }
</script>

<template>
    <HeadingAuth>
        {{ heading }}
    </HeadingAuth>


    <div class="bg-white mt-20 p-8 shadow-lg max-w-3xl mx-auto">
        <FormKit
            type="form"
            submit-label="Crear Cuenta"
            incomplete-message="Revisa Los Mensajes de Error"
            @submit="handleSubmit"
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
                :validation-messages="authStore.rules.name"
            />

            <FormKit 
                type="text"
                name="apellido_paterno"
                label="Apellido Paterno: "
                placeholder="Tu Apellido Paterno"
                validation="required|length:0,60"
                :validation-messages="authStore.rules.apellido"
            />

            <FormKit 
                type="text"
                name="apellido_materno"
                label="Apellido Materno: "
                placeholder="Tu Apellido Paterno"
                validation="required|length:0,60"
                :validation-messages="authStore.rules.apellido"
            />

            <FormKit 
                type="text"
                name="usuario"
                label="Nombre de Usuario: "
                placeholder="Tu Nombre de Usuario"
                help="Ej. usuario-24"
                validation="required|length:4,20|matches:/^[a-z0-9-]+$/"
                :validation-messages="authStore.rules.usuario"
            />

            <FormKit 
                type="email"
                name="email"
                label="Correo Electronico: "
                placeholder="Tu Correo Electronico"
                validation="required|email|length:0,60"
                :validation-messages="authStore.rules.email"
            />

            <FormKit 
                type="password"
                name="password"
                label="Contraseña: "
                placeholder="Tu Contraseña"
                validation="required|length:8,20|contains_symbol|contains_numeric"
                :validation-messages="authStore.rules.password"
            />

            <FormKit 
                type="password"
                name="password_confirmation"
                label="Repite tu Contraseña: "
                placeholder="Repite tu Contraseña"
                validation="required|length:8,20|contains_symbol|contains_numeric"
                :validation-messages="authStore.rules.password"
            />
        </FormKit>
    </div>
</template>