<script setup>
    import { RouterLink } from 'vue-router';

    defineProps({
        salaId: {
            required: true,
        }
    });
</script>

<template>
    <div class="mt-10 max-w-6xl mx-auto bg-white p-4 flex flex-col md:flex-row gap-2 md:gap-4 text-teal-800">
        <RouterLink :to="{name: 'dashboard.salas.index', params: {id: salaId}}" class="font-bold block text-center" active-class="text-teal-500">
            Sala
        </RouterLink>

        <RouterLink :to="{name: 'dashboard.salas.alumnos', params: {id: salaId}}" class="font-bold block text-center" active-class="text-teal-500">
            Alumnos
        </RouterLink>

        <RouterLink :to="{name: 'dashboard.salas.profesores', params: {id: salaId}}" class="font-bold block text-center" active-class="text-teal-500">
            Profesores
        </RouterLink>

        <RouterLink :to="{name: 'dashboard.salas.tests', params: {id: salaId}}" class="font-bold block text-center" active-class="text-teal-500">
            Tests
        </RouterLink>
    </div>
</template>