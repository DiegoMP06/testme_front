<script setup>
    import { computed } from 'vue';
    import { RouterLink } from 'vue-router';

    const props = defineProps({
        user: {
            type: Object,
            required: true,
        }
    });

    defineEmits([
        'handle-click-solicitar'
    ]);

    const canEnlazarse = computed(() => {
        return !props.user.enlazado;
    });
</script>

<template>
    <div class="bg-slate-100 p-2 flex gap-2 items-center">
        <img 
            src="/img/perfil.webp" 
            :alt="`Imagen de Perfil ${user.usuario}`" 
            class="w-8 h-8 rounded-full"
        >

        <div class="flex-1">
            <RouterLink class="block font-bold text-teal-800" :to="{name: 'user.perfil', params: {user: user.usuario}}">
                {{ `${user.name} ${user.apellido_paterno} ${user.apellido_materno}` }}
            </RouterLink>
            
            <p class="text-teal-800 font-semibold text-xs">
                {{ user.usuario }}
            </p>
        </div>

        <button 
            v-if="canEnlazarse"
            @click="$emit('handle-click-solicitar', user.id)"
            type="button" 
            class="bg-teal-800 text-white p-2 rounded hover:bg-teal-900"
        >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4">
                <path stroke-linecap="round" stroke-linejoin="round" d="M18 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0ZM3 19.235v-.11a6.375 6.375 0 0 1 12.75 0v.109A12.318 12.318 0 0 1 9.374 21c-2.331 0-4.512-.645-6.374-1.766Z" />
            </svg>
        </button>
    </div>
</template>