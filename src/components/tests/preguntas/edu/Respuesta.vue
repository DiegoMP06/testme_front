<script setup>
    import { computed } from 'vue';

    const props = defineProps({
        campo: {
            type: Object,
            required: true,
        },
        respuestas: {
            type: Array,
            required: true,
        },
        normal: {
            type: [null, Boolean],
        }, 
        numCampos: {
            type: [null, Number],
        }
    });

    const hasOptions = computed(() => {
        return props.campo.type === 'radio' || props.campo.type === 'checkbox' || props.campo.type === 'select';
    });

    const getRespuesta = computed(() => {
        return props.respuestas.find(respuesta => respuesta.pregunta_id === props.campo.id);
    });

    const getPuntuacion = computed(() => {
        if(props.normal) {
            return (props.respuestas.find(respuesta => respuesta.pregunta_id === props.campo.id).valor / props.numCampos * 100).toFixed(2);
        }

        return 0;
    });
</script>

<template>
    <div class="p-2">
        <p class="text-lg font-bold text-teal-800">
            {{ campo.pregunta }}
        </p>

        <div 
            v-if="hasOptions"
            class="flex gap-2 flex-col md:flex-row my-4"
        >
            <div class="flex-1">
                <h3 class="p-2 font-bold text-slate-700">Opciones</h3>

                <ol class="space-y-2">
                    <li 
                        v-if="normal"
                        v-for="option in campo.opciones"
                        :class="[Number(option.valor) ? 'bg-emerald-100 text-teal-800' : 'bg-red-100 text-red-800']"
                        class="font-semibold py-2 pr-2 pl-6 flex justify-between gap-2"
                    >
                        <p class="flex-1 truncate">
                            {{ option.opcion }}
                        </p>
    
                        <div class="">
                            <svg v-if="Number(option.valor)" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                                <path stroke-linecap="round" stroke-linejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                            </svg>
    
                            <svg v-else xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
                            </svg>                          
                        </div>
                    </li>
    
                    <li 
                        v-else
                        v-for="option in campo.opciones"
                        class="font-semibold py-2 pr-2 pl-6 text-slate-700 bg-slate-100"
                    >
                        <p class="flex-1 truncate">
                            {{ option.opcion }}
                        </p>
                    </li>
                </ol>
            </div>

            <div class="flex-1">
                <h3 class="p-2 font-bold text-slate-700">Tus Respuestas</h3>

                <ol class="space-y-2">
                    <li 
                        v-if="normal"
                        v-for="option in getRespuesta.options"
                        :class="[Number(option.valor) ? 'bg-emerald-100 text-teal-800' : 'bg-red-100 text-red-800']"
                        class="font-semibold py-2 pr-2 pl-6 flex justify-between gap-2"
                    >
                        <p class="flex-1 truncate">
                            {{ option.opcion }}
                        </p>

                        <div class="">
                            <svg v-if="Number(option.valor)" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                                <path stroke-linecap="round" stroke-linejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                            </svg>

                            <svg v-else xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
                            </svg>                          
                        </div>
                    </li>

                    <li 
                        v-else
                        v-for="option in getRespuesta.opciones"
                        class="font-semibold py-2 pr-2 pl-6 text-slate-700 bg-slate-100"
                    >
                        <p class="flex-1 truncate">
                            {{ option.opcion }}
                        </p>
                    </li>
                </ol>
            </div>
        </div>

        <div class="flex flex-col my-4">
            <p class="text-lg font-bold text-teal-800">Valor: </p>

            <p v-if="normal" class="text-slate-700 font-bold">
                {{ getPuntuacion }} Puntos
            </p>

            <p v-else class="text-slate-700 font-bold">
                {{ getRespuesta.valor }}
            </p>
        </div>
    </div>
</template>