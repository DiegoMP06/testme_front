<script setup>
    import { formatearFecha } from '@/helpers';
    import { RouterLink } from 'vue-router';

    const props = defineProps({
        sala: {
            type: Object,
            required: true,
        }, 
        canUnirse: {
            required: true,
        },
        isEnlazado: {
            required: true,
        }, 
        isCreador: {
            required: true,
        }
    });

    defineEmits([
        'handle-click-enlazar',
        'handle-click-eliminar-enlace'
    ]);
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
                    {{ sala.alumnos }} de {{ sala.num_alumnos }} Alumnos.
                </p>
            </div>
        </div>

        <div class="py-2">
            <div v-if="isCreador">
                <RouterLink 
                    :to="{name: 'dashboard.salas.index', params: {id: sala.id}}"
                    class="py-2 px-3 bg-white hover:bg-slate-100 inline-block font-bold text-teal-800"
                >
                    Administrar Sala
                </RouterLink>
            </div>

            <div v-else>
                <button 
                    v-if="isEnlazado" 
                    @click="$emit('handle-click-eliminar-enlace')"
                    class="flex gap-2 text-white px-4 py-2 font-bold bg-rose-700 hover:bg-rose-800"
                >
                    Salirse
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                        <path stroke-linecap="round" stroke-linejoin="round" d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                    </svg>                               
                </button>
    
                <button 
                    v-else-if="canUnirse"
                    @click="$emit('handle-click-enlazar')"
                    class="flex gap-2 text-teal-800 px-4 py-2 font-bold bg-white hover:bg-slate-100"
                >
                    Unirse
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                    </svg>                  
                </button>
            </div>
        </div>
    </aside>
</template>