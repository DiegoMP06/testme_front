<script setup>
    import { RouterLink } from 'vue-router';

    defineProps({
        sala: {
            type: Object,
            required: true,
        },
        isEnlazado: {
            required: true,
        },
        isCreador: {
            required: true,
        },
        isTeacher: {
            required: true,
        },
    });

    defineEmits([
        'handle-click-page'
    ]);
</script>

<template>
    <nav class="grid sm:flex sm:divide-x sm:divide-slate-300">
        <div class="sm:flex-1 grid">
            <RouterLink
                active-class="bg-slate-100" 
                class="block text-center px-4 py-2 border-b-2 border-teal-800 truncate font-bold"
                :to="{name: 'edu.sala.alumnos', params: {id: sala.id}}"
            >
                Alumnos
            </RouterLink>
        </div>

        <div class="sm:flex-1 grid">
            <RouterLink 
                active-class="bg-slate-100" 
                class="block text-center px-4 py-2 border-b-2 border-teal-800 truncate font-bold"
                :to="{name: 'edu.sala.profesores', params: {id: sala.id}}"
            >
                Profesores
            </RouterLink>
        </div>

        <div class="sm:flex-1 grid">
            <RouterLink 
                active-class="bg-slate-100"  
                class="block text-center px-4 py-2 border-b-2 border-teal-800 truncate font-bold"  
                :to="{name: 'edu.sala.tests', params: {id: sala.id}}"
            >
                Tests
            </RouterLink>
        </div>
    </nav>

    <div class="flex-1 p-4">
        <RouterView 
            :sala="sala" 
            :is-creador="isCreador"
            :is-teacher="isTeacher"
            :is-enlazado="isEnlazado"
        />
    </div>
</template>