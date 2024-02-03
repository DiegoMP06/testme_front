<script setup>
    import { formatearFecha } from '@/helpers';
import { RouterLink } from 'vue-router';

    const props = defineProps({
        sala: {
            type: Object,
            required: true,
        }
    });
</script>

<template>
    <aside class="bg-teal-800 p-4 divide-y-2 space-y-6 divide-teal-100 rounded-t lg:rounded-tr-none lg:rounded-l shadow">
        <div class="py-2">
            <h3 class="text-xl font-bold text-slate-100 px-2">Sala de: </h3>

            <RouterLink :to="{}" class="text-white flex gap-4 mt-5 items-center hover:bg-teal-950 p-2 rounded transition-colors">
                <img src="/img/perfil.webp" :alt="`Imagen de perfil de ${sala.user.usuario}`" class="w-12 h-12 rounded-full">
    
                <div class="grid gap-1 flex-1">
                    <p class="font-bold truncate">
                        {{ `${sala.user.name} ${sala.user.apellido_paterno} ${sala.user.apellido_materno}` }}
                    </p>
        
                    <p class="text-xs font-black">
                        {{ sala.user.usuario }}
                    </p>
                </div>
            </RouterLink>
        </div>

        <div class="py-2">
            <h3 class="text-xl font-bold text-slate-100 px-2">Descripcion: </h3>

            <blockquote class="text-white mt-5 p-2">
                {{ sala.descripcion }}
            </blockquote>
        </div>
        
        <div class="py-2">
            <h3 class="text-xl font-bold text-slate-100 px-2">Informacion General: </h3>

            <div class=" p-2 mt-5 space-y-2">
                <p class="text-white font-bold">
                    Creado el {{ formatearFecha(sala.created_at) }}.
                </p>

                <p class="text-white font-bold">
                    {{ sala.alumnos.length }} de {{ sala.num_alumnos }} Alumnos.
                </p>
            </div>
        </div>
    </aside>
</template>