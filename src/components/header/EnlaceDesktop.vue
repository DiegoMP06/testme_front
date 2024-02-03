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
        :active-class="middleware.includes('teacher') ? 'text-teal-200': 'text-teal-800'" 
        class="font-bold text-lg"
    >
        <slot></slot>
    </RouterLink>
</template>