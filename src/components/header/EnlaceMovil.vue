<script setup>
    import { computed } from 'vue';
    import { useAuthStore } from '@/stores/auth';
    import {RouterLink} from 'vue-router'

    const authStore = useAuthStore();

    const props = defineProps({
        name: {
            type: String,
            required: true,
        },
        middleware: {
            type: [Array, null],
            required: true,
        },
    });

    const middlewares = computed(() => {
        if(props.middleware.includes('teacher')) {
            return authStore.isTeacher
        } else if(props.middleware.includes('auth')) {
            return authStore.isAuth;
        }
        
        return true;
    });
</script>

<template>
    <RouterLink 
    v-if="middlewares"
        :to="{name}" 
        active-class="text-white bg-emerald-900" 
        class="font-black p-2 text-center text-lg rounded"
    >
        <slot></slot>
    </RouterLink>
</template>