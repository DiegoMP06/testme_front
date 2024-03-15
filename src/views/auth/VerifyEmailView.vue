<script setup>
    import { ref, onMounted } from 'vue';
    import { RouterLink } from 'vue-router';
    import { useRoute, useRouter } from 'vue-router';
    import { toast } from 'vue3-toastify';
    import UIService from '@/services/UIService';
    import AuthService from '@/services/AuthService';
    import HeadingAuth from '@/components/utilities/HeadingAuth.vue';
    
    const router = useRouter();
    const route = useRoute();
    const cargando = ref(false);
    const error = ref(false);

    defineProps({
        heading: {
            type: String,
            required: true,
        }
    });

    function verifyEmail() {
        cargando.value = true;
        UIService.csrf()
            .then(() => {
                AuthService.verificarEmail({ ...route.params, ...route.query })
                    .then(() => router.push({name: 'home.tests'}))
                    .catch(() => {
                        toast.error('Ha Ocurrido un Error')
                        error.value = true;
                    });
            })
            .catch(() => {
                toast.error('Ha Ocurrido un Error')
                error.value = true;
            })
            .finally(() => cargando.value = false);
    }

    onMounted(() => {
        verifyEmail();
    });
</script>

<template>
    <div>
        <HeadingAuth>
            {{ heading }}
        </HeadingAuth>
    

        <div class="grid gap-4" v-if="!cargando && error">
            <div class="grid gap-2">
                <p class="text-slate-700">Ha Ocurrido un Error al Verificar tu Cuenta, intenta otra vez.</p>
    
                <p class="text-slate-500 text-sm">¡Gracias Por Usar TestMe!</p>
            </div>
    
            <RouterLink class="text-teal-700 font-bold text-lg" :to="{name: 'auth.notification-email'}">Intentar de Nuevo</RouterLink>
        </div>
    </div>
</template>