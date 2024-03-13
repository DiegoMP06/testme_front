<script setup>
    import {RouterLink, useRoute} from 'vue-router';
    import {formatearFecha} from '@/helpers';

    const route = useRoute();

    defineProps({
        resultado: {
            type: Object,
            required: true,
        },
    });
</script>

<template>
    <div class="bg-slate-100 hover:bg-slate-200 p-4 rounded">
        <RouterLink class="flex gap-2 items-center" :to="{name: 'user.perfil', params: {user: resultado.user.usuario}}">
            <img src="/img/perfil.webp" :alt="`Imagen de Perfil de ${resultado.user.usuario}`" class="w-10 h-10 rounded-full">

            <div class="grid flex-1">
                <p class="font-semibold text-slate-700">
                    {{ `${resultado.user.name} ${resultado.user.apellido_paterno} ${resultado.user.apellido_materno}` }}
                </p>

                <p class="text-xs font-extrabold text-slate-700">
                    {{ resultado.user.usuario }}
                </p>
            </div>
        </RouterLink>

        <p class="text-slate-700 font-bold mt-4">
            Obtuvo
            <span class="text-teal-800 font-black">
                {{ resultado.puntuacion }}
            </span>
            de
            <span class="text-teal-800 font-black">
                {{ resultado.total }}
            </span>
            Puntos
        </p>

        <p class="text-md font-extrabold">
            Se Contesto el {{ formatearFecha(resultado.created_at) }}
        </p>

        <RouterLink :to="{name: 'dashboard.tests.version.resultado', params: {testId:  route.params.testId, versionId: route.params.versionId, visitaId: resultado.id}}" class="mt-4 inline-block font-bold text-white bg-teal-800 hover:bg-teal-900 transition-colors px-4 py-2">
            Ver Mas
        </RouterLink>
    </div>
</template>