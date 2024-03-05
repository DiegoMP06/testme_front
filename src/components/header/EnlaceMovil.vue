<script setup>
    import { computed } from 'vue';
    import { useAuthStore } from '@/stores/auth';
    import {RouterLink} from 'vue-router'

    const authStore = useAuthStore();

    const props = defineProps({
        enlace: {
            type: Object,
            required: true,
        },
        params: {
            type: [Object, null],
        }
    });

    const parametros = computed(() => {
        const parametros = {};
        props.enlace?.params?.forEach(parametro => parametros[parametro] = props.params[parametro]);
        return parametros;
    });

    const middlewares = computed(() => {
        if(props?.enlace?.middleware?.includes('teacher')) {
            return authStore.isTeacher;
        } else if(props?.enlace?.middleware?.includes('auth')) {
            return authStore.isAuth;
        } else if(props?.enlace?.middleware?.includes('guest')) {
            return !authStore.isAuth;
        }
        
        return true;
    });
</script>

<template>
    <RouterLink 
        v-if="middlewares"
        :to="{name: enlace.name, params: parametros}" 
        active-class="text-white bg-emerald-900" 
        class="font-bold p-2 text-center rounded"
    >
        {{ enlace.texto }}
    </RouterLink>
</template>