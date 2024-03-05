<script setup>
    import {formatearFecha} from '@/helpers'

    const props = defineProps({
        test: {
            type: Object,
            required: true,
        },
        visita: {
            type: Object,
            required: true,
        },
        getInstruccion: {
            required: true,
        },
        canWatchRespuestas: {
            required: true,
        },
    });

    defineEmits([
        'handle-click-page',
    ]);
</script>

<template>
    <div class="p-2">
        <h2 class="text-lg font-black text-teal-800">
            {{ getInstruccion.titulo }}
        </h2>

        <p class="text-slate-700 font-black mt-5">
            Obtuviste 
            <span class="text-teal-800">
                {{ visita.puntuacion }}
            </span>
            de
            <span class="text-teal-800">
                {{ visita.total }}
            </span>
            Puntos
        </p>

        <blockquote class="text-slate-700 my-6">
            {{ getInstruccion.instruccion }}
        </blockquote>

        <p class="text-xs font-black text-slate-700">
            Contestado el
            {{ formatearFecha(visita.created_at) }}
        </p>

        <button 
            v-if="canWatchRespuestas" 
            class="mt-10 text-white font-bold px-4 py-2 bg-teal-700 hover:bg-teal-900 transition-colors" 
            @click="$emit('handle-click-page', 3)"
        >
            Ver Respuestas
        </button>
    </div>
</template>