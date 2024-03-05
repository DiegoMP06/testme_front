<script setup>
    import { useAuthStore } from '@/stores/auth';
    import EnlacePerfil from '../utilities/EnlacePerfil.vue';

    const authStore = useAuthStore();

    defineProps({
        isAnimarUser: {
            required: true,
        },
        isOpenMenuUser: {
            required: true,
        }
    });

    defineEmits([
        'handle-click-menu-user',
    ]);
</script>

<template>
    <div
        v-if="isOpenMenuUser" 
        :class="[isAnimarUser ? 'translate-x-0 opacity-100' : 'translate-x-96 opacity-0']" 
        class="hidden md:flex fixed top-0 bottom-0 left-0 right-0 transition-all z-50"
    >
        <button 
            @click="$emit('handle-click-menu-user')"
            type="button" 
            class="fixed top-5 left-5 bg-red-400 p-1 rounded-full hover:bg-red-600 text-gray-100"
        >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-8 h-8">
                <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
            </svg>
        </button>

        <div 
            @click="$emit('handle-click-menu-user')"
            class="flex-1"
        ></div>

        <div 
            class="bg-emerald-800 border-l-gray-100 border-l-2 w-1/3"
        >
            <nav class="px-4 mt-8 flex flex-col text-gray-100">
                <RouterLink :to="{name: 'user.perfil', params: {user: authStore.user.usuario}}" class="mb-6" v-if="authStore.isAuth">
                    <EnlacePerfil :mostrar="true" />
                </RouterLink>
                <slot></slot>

                <button v-if="authStore.isAuth" class="font-bold" @click="authStore.logout">
                    Cerrar Sesion
                </button>
            </nav>
        </div>
    </div>
</template>