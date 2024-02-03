<script setup>
    import CircleProgress from 'vue3-circle-progress';
    import 'vue3-circle-progress/dist/circle-progress.css'

    const props = defineProps({
        puntajeMaximo: {
            type: Number,
            required: true,
        },
        puntajeMinimo: {
            type: Number,
            required: true,
        },
        puntajeActual: {
            type: Number,
            required: true,
        },
        porcentaje: {
            type: Number,
            required: true,
        }
    });

    
</script>

<template>
    <div class="flex flex-col sm:flex-row gap-8">
        <div class="flex items-center justify-center relative">
            <CircleProgress
                class="w-full"
                :percent="porcentaje"
                :size="250"
                :border-width="25"
                :border-bg-width="25"
                :is-gradient="true"
                :gradient="{
                    angle: 45,
                    startColor: 'rgb(13 148 136)',
                    stopColor: 'rgb(17 94 89)'
                }"
                empty-color="rgb(229 231 235)"
            />
            <p class="absolute text-xl font-extrabold">{{ porcentaje.toFixed(2) }}%</p>
        </div>

        <div class="flex-1 p-4 space-y-4">
            <p class="text-xl font-bold text-center md:text-left">
                De
                <span class="font-extrabold text-teal-800">
                    {{ puntajeMinimo }}
                </span>
                a
                <span class="font-extrabold text-teal-800">
                    {{ puntajeMaximo }} Puntos.
                </span>
            </p>

            <p class="text-xl font-bold text-center md:text-left">
                Disponible: 
                <span class="font-extrabold text-teal-800">
                    {{ (puntajeMaximo + 1) - puntajeActual }} puntos.
                </span>
            </p>

            <p class="text-xl font-bold text-center md:text-left">
                Llevas: 
                <span class="font-extrabold text-teal-800">
                    {{ puntajeActual - puntajeMinimo }} puntos.
                </span>
            </p>
        </div>
    </div>
</template>