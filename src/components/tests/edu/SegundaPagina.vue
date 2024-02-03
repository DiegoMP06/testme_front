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
        }
    });
</script>

<template>
    <div class="">
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
    </div>
</template>