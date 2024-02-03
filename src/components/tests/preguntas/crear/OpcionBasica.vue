<script setup>
    import { FormKit } from '@formkit/vue';

    const props = defineProps({
        opcion: {
            type: Object,
            required: true,
        }, 
        campoId: {
            type: [String, null],
            required: false
        },
        isBasico: {
            required: true,
        },
        isNumber: {
            required: true,
        },
        isExamen: {
            type: [null, Boolean],
            required: true,
        }
    });

    const emits = defineEmits([
        'handle-click-actualizar-opcion',
        'handle-click-eliminar-opcion',
    ]);
</script>

<template>
    <div 
        :class="{'w-full bg-emerald-50 rounded': isBasico}"
        class="p-3 flex flex-col sm:flex-row justify-between gap-4"
        >
        <div class="space-y-2">
            <p class="font-extrabold text-teal-800">{{ opcion.opcion }}</p>

            <p 
                v-if="isExamen"
                class="text-sm font-extrabold flex gap-2" 
                :class="[opcion.valor ? 'text-teal-700' : 'text-red-700']"
            >
                <svg v-if="opcion.valor" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
                    <path stroke-linecap="round" stroke-linejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                </svg>

                <svg v-else xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
                </svg>
                
                {{ opcion.valor ? 'Correcto' : 'Incorrecto' }}
            </p>
            

            <p class="font-bold text-xs" v-else>
                <span class="font-extrabold">Valor: </span>
                {{ opcion.valor }}
                
                <span 
                    v-if="isNumber"
                >
                    Punto(s)
                </span>
            </p>
        </div>


        <div class="flex sm:items-center gap-4 flex-col sm:flex-row">
            <div v-if="isExamen">
                <FormKit 
                    type="checkbox"
                    label="Respuesta"
                    v-model="opcion.valor"
                />
            </div>

            <div class="flex gap-4 justify-between">
    
                <button 
                    @click="$emit('handle-click-actualizar-opcion', [opcion.token, campoId ?? null])"
                    type="button" 
                    class="p-2 bg-teal-200 rounded-md hover:bg-teal-300"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                        <path stroke-linecap="round" stroke-linejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
                    </svg>                      
                </button>
    
                <button 
                    @click="$emit('handle-click-eliminar-opcion', [opcion.token, campoId ?? null])"
                    type="button" 
                    class="p-2 bg-red-200 rounded-md hover:bg-red-300"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                        <path stroke-linecap="round" stroke-linejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                    </svg>
                </button>
            </div>
        </div>
    </div>
</template>