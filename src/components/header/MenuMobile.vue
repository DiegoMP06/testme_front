<script setup>
    import { useAuthStore } from '@/stores/auth';
    import EnlacePerfil from '../utilities/EnlacePerfil.vue';

    const authStore = useAuthStore();

    defineProps({
        isAnimar: {
            required: true,
        },
        isOpenMenu: {
            required: true,
        }
    });

    defineEmits([
        'handle-click-menu',
    ]);
</script>

<template>
    <div
        :class="[isAnimar ? 'translate-x-0 opacity-100' : 'translate-x-96 opacity-0']" 
        v-if="isOpenMenu" 
        class="md:hidden fixed top-0 bottom-0 left-0 right-0 flex transition-all"
    >
        <button 
            @click="$emit('handle-click-menu')"
            type="button" 
            class="fixed top-5 left-5 bg-red-400 p-1 rounded-full hover:bg-red-600 text-gray-100"
        >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-8 h-8">
                <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
            </svg>
        </button>

        <div 
            @click="$emit('handle-click-menu')"
            class="flex-1"
        ></div>

        <div 
            class="bg-emerald-700 w-2/3 border-l-2 border-l-teal-800"
        >
            <nav class="px-4 mt-8 flex flex-col text-teal-100">
                <RouterLink :to="{}" class="mb-6" v-if="authStore.isAuth">
                    <EnlacePerfil />
                </RouterLink>
                <slot></slot>
            </nav>
        </div>
    </div>
</template>