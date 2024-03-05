<script setup>
    import {computed} from 'vue';
    import {RouterLink} from 'vue-router';
    import {formatearFecha} from '@/helpers';

    const props = defineProps({
        sala: {
            required: true,
            type: Object,
        },
    });

    const isProfesor = computed(() => {
        return props.sala.profesor;
    });
</script>

<template>
    <div class="bg-slate-100 hover:bg-slate-200 rounded transition-colors p-4 grid">
        <RouterLink :to="{name: 'edu.sala.tests', params: {id: sala.sala.id}}" class="text-teal-800 font-extrabold text-xl truncate">
            {{ sala.sala.nombre }}
        </RouterLink>

        <RouterLink :to="{name: 'user.perfil', params: {user: sala.sala.user.usuario}}" class="flex gap-2 items-center mt-4">
            <img 
                src="/img/perfil.webp" 
                :alt="`Imagen de Perfil de ${sala.sala.user.usuario}`"
                class="w-10 h-10 rounded-full"
            />
            
            <div class="grid">
                <p class="font-semibold">
                    {{ `${sala.sala.user.name} ${sala.sala.user.apellido_paterno} ${sala.sala.user.apellido_materno}` }}
                </p>
                
                <p class="text-xs font-extrabold">
                    {{ sala.sala.user.usuario }}
                </p>
            </div>
        </RouterLink>

        <p class="font-bold text-slate-700 mt-4">
            {{ isProfesor ? 'Profesor' : 'Alumno' }}
        </p>

        <p class="text-xs font-extrabold text-slate-700">
            Te Uniste el {{ formatearFecha(sala.created_at) }}
        </p>
    </div>
</template>