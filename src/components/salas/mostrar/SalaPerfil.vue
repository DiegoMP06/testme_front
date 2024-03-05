<script setup>
    import {computed} from 'vue'
    import { RouterLink } from 'vue-router';

    const props =  defineProps({
        sala: {
            type: Object,
            required: true,
        }
    });

    const isPublico = computed(() => {
        return props.sala.publico;
    });
</script>

<template>
    <div class="bg-slate-200 p-4 rounded gap-2 flex justify-between items-center">
        <RouterLink 
            :to="{name: 'edu.sala.tests', params: {id: sala.id}}" 
            class="text-lg font-bold text-slate-700 truncate"
        >
            {{ sala.nombre }}
        </RouterLink>

        <p class="text-sm font-semibold" :class="[isPublico ? 'text-teal-700' : 'text-rose-700']">
            {{ isPublico ? 'Publico' : 'Privado' }}
        </p>
    </div>
</template>