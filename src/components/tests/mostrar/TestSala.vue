<script setup>
    defineProps({
        sala: {
            required: true,
            type: Object,
        },
        testId: {
            required: true,
            type: [Number, String],
        },
        versionId: {
            required: true,
            type: [Number, String],
        },
    });
</script>

<template>
    <div class="p-4 bg-slate-100 hover:bg-slate-200 rounded grid gap-2 transition-colors">
        <div class="flex justify-between">
            <RouterLink class="text-xl font-extrabold text-teal-800" :to="{name: 'edu.sala.tests', params: {id: sala.sala.id}}">
                {{ sala.sala.nombre }}
            </RouterLink>
    
            <p :class="[sala.sala.publico ? 'text-teal-800' : 'text-rose-800']" class="font-bold text-lg">
                {{ sala.sala.publico ? 'Publico' : 'Privado' }}
            </p>
        </div>

        <RouterLink :to="{name: 'user.perfil', params: {user: sala.sala.user.usuario}}" class="flex gap-2 items-center">
            <img src="/img/perfil.webp" :alt="`Imagen de Perfil de ${sala.sala.user.usuario}`" class="w-10 h-10 rounded-full">

            <div class="grid flex-1">
                <p class="font-semibold text-slate-700">
                    {{ `${sala.sala.user.name} ${sala.sala.user.apellido_paterno} ${sala.sala.user.apellido_materno}` }}
                </p>

                <p class="text-xs font-extrabold text-slate-700">
                    {{ sala.sala.user.usuario }}
                </p>
            </div>
        </RouterLink>

        <div>
            <RouterLink :to="{name: 'dashboard.tests.version.salas.resultados', params: {testId, versionId, salaId: sala.id}}" class="text-white font-bold px-4 py-2 bg-teal-800 hover:bg-teal-900 transition-colors inline-block mt-6">
                Ver Resultados
            </RouterLink>
        </div>
    </div>
</template>