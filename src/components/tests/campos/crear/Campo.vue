<script setup>
    import { computed } from 'vue';
    import OpcionBasica from '../../preguntas/crear/OpcionBasica.vue';
    import CardAcordeon from '@/components/UI/CardAcordeon.vue';

    const props = defineProps({
        campo: {
            type: Object,
            required: true,
        },
        opcionesExtras: {
            type: Array,
            required: true,
        },
        inputsCampos: {
            type: Object,
            required: true,
        },
    });

    const emits = defineEmits([
        'handle-click-actualizar-campo',
        'handle-click-eliminar-campo',
        'handle-click-crear-opcion-campo',
        'handle-click-actualizar-opcion-campo',
        'handle-click-eliminar-opcion-campo',
    ]);

    const getOpciones = computed(() => {
        return {...props.opcionesExtras.find(campo => campo.pregunta_token === props.campo.token)};
    });

    const hasOpciones = computed(() => {
        const opciones = props.opcionesExtras.find(campo => campo.pregunta_token === props.campo.token);
        return opciones.opciones.length > 0;
    });
    
    const hasPlaceholder = computed(() => {
        return props.campo.type === 'text' || props.campo.type === 'textarea' || props.campo.type === 'number';
    });

    const isNumeric = computed(() => {
        return props.campo.type === 'number';
    });

    const isOpciones = computed(() => {
        return props.campo.type === 'radio' || props.campo.type === 'checkbox' || props.campo.type === 'select';
    });

    const isEntero = computed(() => {
        return props.campo.extras.int;
    });

    const isRequired = computed(() => {
        return props.campo.required;
    });

    const isIncomplete = computed(() => {
        return {...props.opcionesExtras.find(campo => campo.pregunta_token === props.campo.token)}?.opciones?.length < 2;
    });
</script>

<template>
    <CardAcordeon :animar="true" :class="{'border-2 border-rose-700': isOpciones && isIncomplete}">
        <template v-slot:header>
            <p class="font-extrabold text-slate-700 truncate">
                {{ campo.pregunta }}
            </p>

            <p class="text-xs font-bold text-gray-700 flex gap-4 flex-wrap">
                {{ inputsCampos[campo.type] }}
                <span
                    v-if="isRequired"
                    class="text-rose-700 text-xs"
                >
                    * Obligatorio
                </span>
            </p>
        </template>

        <template v-slot:body>
            <div class="space-y-2 divide-y-2 divide-emerald-300">
                <p 
                    v-if="hasPlaceholder"
                    class="font-bold text-slate-700 p-2 text-sm"
                >
                    Texto Guia:
                    <span class="font-normal truncate text-gray-700">
                        {{ campo.extras.placeholder ? campo.extras.placeholder : 'No Tiene Texto Guia' }}
                    </span>
                </p>
    
                <div v-if="isNumeric" class="space-y-2 divide-y-2 divide-emerald-300">
                    <p class="font-bold text-slate-700 p-2 text-sm">
                        Minimo:
                        <span class="font-normal truncate text-gray-700">
                            {{ campo.extras.min || campo.extras.min === 0 ? campo.extras.min : 'No Tiene Numero Minimo' }}
                        </span>
                    </p>
    
                    <p class="font-bold text-slate-700 p-2 text-sm">
                        Maximo:
                        <span class="font-normal truncate text-gray-700">
                            {{ campo.extras.max || campo.extras.max === 0 ? campo.extras.max : 'No Tiene Numero Maximo' }}
                        </span>
                    </p>
    
                    <p class=" p-2">
                        <span 
                            class="font-bold text-sm"
                            :class="[isEntero ? 'text-teal-700' : 'text-cyan-700']"
                        >
                            Solo {{ isEntero ? 'Enteros' : 'Decimales' }}
                        </span>
                    </p>
                </div>
                
                <div 
                    v-if="isOpciones"
                    class="my-6 space-y-4 divide-y-2 divide-emerald-300"
                >
                    <OpcionBasica 
                        v-if="hasOpciones"
                        v-for="opcion in getOpciones.opciones"
                        :key="opcion.token"
                        :campo-id="getOpciones.id"
                        :opcion="opcion"
                        :is-basico="false"
                        :is-number="false"
                        :is-examen="false"
                        @handle-click-actualizar-opcion="$emit('handle-click-actualizar-opcion-campo', $event)"
                        @handle-click-eliminar-opcion="$emit('handle-click-eliminar-opcion-campo', $event)"
                    />
                        
                    <p 
                        v-else
                        class="text-center font-bold text-sm"
                    >
                        Este Campo No Tiene Opciones (Minimo 2)
                    </p>
                </div>
            </div>

            <div class="flex flex-col-reverse sm:flex-row-reverse sm:justify-between gap-4">

                <div class="flex gap-4 justify-between">
                    <button 
                        @click="$emit('handle-click-actualizar-campo', campo.token)"
                        type="button" 
                        class="p-2 bg-teal-200 rounded-md hover:bg-teal-300"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                            <path stroke-linecap="round" stroke-linejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
                        </svg>                      
                    </button>
        
                    <button 
                        @click="$emit('handle-click-eliminar-campo', campo.token)"
                        type="button" 
                        class="p-2 bg-red-200 rounded-md hover:bg-red-300"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                            <path stroke-linecap="round" stroke-linejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                        </svg>                      
                    </button>
                </div>

                <button 
                    v-if="isOpciones"
                    @click="$emit('handle-click-crear-opcion-campo', getOpciones.id)"
                    class="py-2 px-4 bg-teal-800 rounded-sm text-center font-bold text-white hover:bg-emerald-900 flex items-center justify-center gap-1 text-sm"
                    type="button"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                    </svg>
                    Agregar
                </button>
            </div>
        </template>

        <template v-if="isOpciones" v-slot:footer>
            <p 
                class="text-sm font-black mt-4"
                :class="[isIncomplete ? 'text-rose-800' :  'text-teal-800 ']"
            >
                {{ getOpciones.opciones.length }} Opciones
            </p>
        </template>
    </CardAcordeon>
</template>