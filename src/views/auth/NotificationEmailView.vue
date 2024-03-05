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

    const handleSubmit = () => authStore.sendEmail();

</script>

<template>
    <HeadingAuth>
        {{ heading }}
    </HeadingAuth>

    <div class="grid gap-4">
        <div class="grid gap-2">
            <p class="text-slate-700">Te Hemos Enviado un Email Con las indicaciones a Seguir. Ya Casi Esta Lista tu Cuenta.</p>

            <p class="text-slate-500 text-sm">¿No Te llego el Email?</p>
        </div>

        <FormKit
            type="form"
            submit-label="Enviar de Nuevo"
            @submit="handleSubmit"
        >
            <p v-for="error in authStore.errores" class="formkit-message">
                {{ error }}
            </p>
        </FormKit>
    </div>
    
</template>