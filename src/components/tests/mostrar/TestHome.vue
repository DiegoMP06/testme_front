<script setup>
    import { RouterLink } from 'vue-router';

    const props = defineProps({
        test: {
            type: Object,
            required: true,
        },

    });
</script>

<template>
    <div class="bg-white p-4 shadow rounded flex flex-col gap-2">

        <RouterLink 
            :to="{name: 'edu.test', params: {id: test.id}}" 
            class="text-lg font-bold text-slate-700"
        >
            {{ test.nombre }}
        </RouterLink>

        <RouterLink 
            :to="{name: ''}" 
            class="text-sm font-normal text-slate-600 flex gap-2"
        >
            <img 
                class="w-10 h-10 rounded-full"
                :src="test.user?.imagen ?? '/img/perfil.webp'" 
                :alt="`imagen de perfil ${test.user.usuario}`"
            />

            <span class="flex flex-col">
                {{ `${test.user?.name} ${test.user?.apellido_paterno} ${test.user?.apellido_materno}` }}

                <span class="text-xs font-black">
                    {{ test.user?.usuario }}
                </span>
            </span>
        </RouterLink>
    </div>
</template>