<script setup>
    import { formatearFecha } from '@/helpers';
import {RouterLink} from 'vue-router'

    defineProps({
        visita: {
            type: Object,
            required: true,
        },
        sala: {
            type: [Boolean, null],
        }
    });
</script>

<template>
    <div class="bg-slate-100 rounded hover:bg-slate-200 transition-colors p-4 grid">
        <RouterLink class="text-lg font-bold text-slate-700 truncate" :to="sala ? {name: 'edu.sala.test', params: {salaId: visita.sala.id, testId: visita.test_sala_id}} : {name: 'edu.test', params: {id: visita.test.id}}">
            {{ visita.test.nombre }}
        </RouterLink>
        
        <RouterLink :to="{name: 'user.perfil', params: {user: visita.test.user.usuario}}" class="flex gap-2 items-center mt-4">
            <img 
                src="/img/perfil.webp" 
                :alt="`Imagen de Perfil de ${visita.test.user.usuario}`"
                class="w-10 h-10 rounded-full"
            />
            
            <div class="grid">
                <p class="font-semibold">
                    {{ `${visita.test.user.name} ${visita.test.user.apellido_paterno} ${visita.test.user.apellido_materno}` }}
                </p>
                
                <p class="text-xs font-extrabold">
                    {{ visita.test.user.usuario }}
                </p>
            </div>
        </RouterLink>
        
        <div class="mt-2">
            <p class="text-slate-700 font-bold mb-3" v-if="sala">
                Sala:
                <RouterLink :to="{name: 'edu.sala.tests', params: {id: visita.sala.id}}" class="text-teal-800 font-extrabold"> 
                    {{ visita.sala.nombre }}
                </RouterLink>
            </p>

            <p class="text-slate-700 font-bold">
                Obtuviste 
                <span class="text-teal-700">
                    {{ visita.puntuacion }}
                </span>
                de
                <span class="text-teal-700">
                    {{ visita.total }}
                </span>
                puntos
            </p>

            <p class="text-slate-700 text-sm font-extrabold">
                Contestado el {{ formatearFecha(visita.created_at) }}
            </p>
        </div>
    </div>
</template>