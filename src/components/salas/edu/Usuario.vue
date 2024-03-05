<script setup>
    import { RouterLink } from 'vue-router';

    defineProps({
        usuario: {
            type: Object,
            required: true,
        }
    });
</script>

<template>
    <RouterLink class="flex bg-slate-50 hover:bg-slate-100 p-2 rounded gap-4 items-center" :to="{name: 'user.perfil', params: {user: usuario.usuario}}">
        <div class="w-10 h-10 rounded-full overflow-hidden">
            <img src="/img/perfil.webp" :alt="`imagen perfil ${usuario.usuario}`">
        </div>

        <div class="flex-1 grid">
            <p class="text-sm">
                {{ `${usuario.name} ${usuario.apellido_paterno} ${usuario.apellido_materno}` }}
            </p>

            <p class="text-xs font-bold">
                {{ usuario.usuario }}
            </p>
        </div>
    </RouterLink>
</template>