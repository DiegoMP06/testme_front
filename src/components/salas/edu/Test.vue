<script setup>
    import { RouterLink } from 'vue-router';

    defineProps({
        test: {
            type: Object,
            required: true,
        }, 
        salaId: {
            type: [Number, String, null],
            required: false,
        },
        publicos: {
            type: [Boolean, null],
            required: false,
        },
        user: {
            type: [Boolean, null],
            required: false,
        },
        cerrados: {
            type: [Boolean, null],
            required: false,
        },
    });
</script>

<template>
    <div class="flex flex-col bg-slate-100 hover:bg-slate-200 transition-colors p-2 rounded gap-2">

        <div class="grid">
            <RouterLink v-if="publicos" class="text-teal-800 font-bold text-lg truncate" :to="{name: 'edu.sala.test', params: {salaId, testId: test.pivot.id}}">
                {{ test.nombre }}
            </RouterLink>

            <p v-else class="text-teal-800 font-bold text-lg truncate">
                {{ test.nombre }}
            </p>
        </div>

        <RouterLink class="flex gap-2" :to="{}">
            <img src="/img/perfil.webp" :alt="`Imagen de Perfil de ${test.user.usuario}`" class="w-10 h-10 rounded-full">
            
            <div class="flex flex-col justify-center">
                <p class="text-sm">
                    {{ `${test.user.name} ${test.user.apellido_paterno} ${test.user.apellido_materno}` }}
                </p>

                <p class="text-xs font-bold">
                    {{ test.user.usuario }}
                </p>
            </div>
        </RouterLink>
    </div>
</template>