<script setup>
    import Respuesta from '../preguntas/edu/Respuesta.vue';

    const props = defineProps({
        test: {
            type: Object,
            required: true,
        },
        visita: {
            type: Object,
            required: true,
        },
    });

    defineEmits([
        'handle-clik-page',
    ]);
</script>

<template>
    <div class="p-2 divide-y-2 divide-slate-300">
        <div class="">
            <p class="text-slate-700 text-xl p-2 my-6 text-center">
                <span class="font-bold text-teal-700">
                    {{ visita.puntuacion }}
                </span>
                de 
                <span class="font-bold text-teal-700">
                    {{ visita.total }}
                </span>
                puntos
            </p>
        </div>

        <Respuesta 
            v-for="campo in test.camposExtra"
            :campo="campo"
            :respuestas="visita.respuestas"
        />
        
        <Respuesta 
            v-for="campo in test.campos"
            :campo="campo"
            :respuestas="visita.respuestas"
            :normal="true"
            :num-campos="test.campos.length"
        />
    </div>

    <div class="px-2 border-none">
        <button 
            type="button" 
            class="text-white font-bold py-2 px-4 bg-teal-800 hover:bg-teal-900 transition-colors"
            @click="$emit('handle-clik-page', 2)"
        >
            Volver
        </button>
    </div>
</template>