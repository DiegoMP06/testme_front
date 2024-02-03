<script setup>
    import { computed } from 'vue';
    import { RouterLink } from 'vue-router';

    const props = defineProps({
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
    <RouterLink 
        :to="{name: 'dashboard.salas.index', params: {id: sala.id}}" 
        class="bg-teal-700 p-4 rounded shadow-lg flex justify-between"
    >
        <p class="text-white font-bold text-lg">
            {{ sala.nombre }}
        </p>

        <p class="font-bold" :class="[isPublico ? 'text-emerald-200' : 'text-rose-200']">
            {{ isPublico ? 'Publico' : 'Privado' }}
        </p>
    </RouterLink>
</template>