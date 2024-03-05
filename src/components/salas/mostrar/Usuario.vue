<script setup>
    import { RouterLink } from 'vue-router';

    defineProps({
        usuario: {
            type: Object,
            required: true
        }
    });

    defineEmits([
        'handle-click-desvincular',
    ]);
</script>

<template>
    <div class="p-2 bg-teal-800 flex rounded justify-between items-center gap-2">
        <div class="grid">
            <RouterLink :to="{name: 'user.perfil', params: {user: usuario.usuario}}" class="text-white font-bold truncate">
                {{ `${usuario.name} ${usuario.apellido_paterno} ${usuario.apellido_materno}` }}
            </RouterLink>

            <p class="text-white text-xs">
                {{ usuario.usuario }}
            </p>
        </div>

        <button 
            @click="$emit('handle-click-desvincular', usuario)"
            class="bg-slate-50 hover:bg-slate-200 p-2 rounded"
        >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4">
                <path stroke-linecap="round" stroke-linejoin="round" d="M22 10.5h-6m-2.25-4.125a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0ZM4 19.235v-.11a6.375 6.375 0 0 1 12.75 0v.109A12.318 12.318 0 0 1 10.374 21c-2.331 0-4.512-.645-6.374-1.766Z" />
            </svg>
        </button>
    </div>
</template>