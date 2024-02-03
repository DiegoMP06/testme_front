<script setup>
    import { toast } from 'vue3-toastify';
    import Pregunta from '../preguntas/crear/Pregunta.vue';
    import OpcionBasica from '../preguntas/crear/OpcionBasica.vue';
    import OpcionGeneral from '../preguntas/crear/ListadoOpciones.vue';
    import Campo from '../campos/crear/Campo.vue';

    const props = defineProps({
        test: {
            type: Object,
            required: true,
        },
        preguntasNormales: {
            type: Array,
            required: true,
        },
        opcionesNormales: {
            type: Array,
            required: true,
        },
        preguntasExtras: {
            type: Array,
            required: true,
        },
        opcionesExtras: {
            type: Array,
            required: true,
        },
        crearInstrucciones: {
            required: true,
        },
        hasCampos: {
            required: true,
        },
        hasOpciones: {
            required: true,
        },
        hasPreguntas: {
            required: true,
        },
        isBasico: {
            required: true,
        },
        isMultiple: {
            required: true,
        },
        isExamen: {
            required: true,
        },
        inputsCampos: {
            type: Object,
            required: true,
        },
    });

    const emits = defineEmits([
        'handle-click-anterior',
        'handle-click-siguiente',
        'handle-click-multiple',
        'handle-click-crear-campo',
        'handle-click-actualizar-campo',
        'handle-click-eliminar-campo',
        'handle-click-crear-opcion-campo',
        'handle-click-actualizar-opcion-campo',
        'handle-click-eliminar-opcion-campo',
        'handle-click-crear-pregunta',
        'handle-click-actualizar-pregunta',
        'handle-click-eliminar-pregunta',
        'handle-click-crear-opcion',
        'handle-click-actualizar-opcion',
        'handle-click-eliminar-opcion',
    ]);

    const handleClickNoAuthorize = () => {
        toast.error('No Has Llenado Todos Los Campos');
    }
</script>

<template>
    <div class="divide-y-2 divide-slate-300 space-y-8 mb-16">
        <div>
            <h3 class="text-emerald-700 font-bold text-xl">Campos: </h3>

            <div class="space-y-4 my-5">
                <Campo 
                    v-if="hasCampos"
                    v-for="campo in preguntasExtras"
                    :key="campo.token"
                    :campo="campo"
                    :opciones-extras="opcionesExtras"
                    :inputs-campos="inputsCampos"
                    @handle-click-actualizar-campo="$emit('handle-click-actualizar-campo', $event)"
                    @handle-click-eliminar-campo="$emit('handle-click-eliminar-campo', $event)"
                    @handle-click-crear-opcion-campo="$emit('handle-click-crear-opcion-campo', $event)"
                    @handle-click-actualizar-opcion-campo="$emit('handle-click-actualizar-opcion-campo', $event)"
                    @handle-click-eliminar-opcion-campo="$emit('handle-click-eliminar-opcion-campo', $event)"
                />

                <p 
                    v-else
                    class="text-center font-bold text-sm my-6"
                >No Hay Campos</p>
            </div>

            <button 
                @click="$emit('handle-click-crear-campo')"
                class="py-2 px-4 rounded-sm border-2 border-emerald-800 font-extrabold text-emerald-800 flex gap-1 text-sm items-center justify-center hover:bg-emerald-100"
                type="button"
            >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                </svg>
                Agregar
            </button>
        </div>
        
        <div>
            <h3 class="text-emerald-700 font-bold text-xl">Preguntas: </h3>

            <div class="space-y-4 my-6">
                <Pregunta 
                    v-if="hasPreguntas"
                    v-for="pregunta in preguntasNormales"
                    :key="pregunta.token"
                    :pregunta="pregunta"
                    @handle-click-actualizar-pregunta="$emit('handle-click-actualizar-pregunta', $event)"
                    @handle-click-eliminar-pregunta="$emit('handle-click-eliminar-pregunta', $event)"
                />
                
                <p v-else class="text-center font-bold text-sm">No Hay Preguntas (Minimo 5)</p>
            </div>

            <button 
                @click="$emit('handle-click-crear-pregunta')"
                class="py-2 px-4 rounded-sm border-2 border-emerald-800 font-extrabold text-emerald-800 flex gap-1 text-sm items-center justify-center hover:bg-emerald-100"
                type="button"
            >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                </svg>
                Agregar
            </button>
        </div>

        <div>
            <h3 class="text-emerald-700 font-bold text-xl">Opciones: </h3>

            <div class="space-y-4 my-6">
                <OpcionBasica
                    v-if="isBasico"
                    v-for="opcion in opcionesNormales"
                    :key="opcion.token"
                    :opcion="opcion"
                    :campo-id="null"
                    :is-basico="true"
                    :is-number="true"
                    :is-examen="false"
                    @handle-click-actualizar-opcion="$emit('handle-click-actualizar-opcion', $event)"
                    @handle-click-eliminar-opcion="$emit('handle-click-eliminar-opcion', $event)"
                />

                <OpcionGeneral 
                    v-else
                    v-for="campo in preguntasNormales"
                    :key="campo.token"
                    :campo="campo"
                    :test="test"
                    :opciones-normales="opcionesNormales"
                    :is-multiple="isMultiple"
                    :is-examen="isExamen"
                    @handle-click-multiple="$emit('handle-click-multiple', $event)"
                    @handle-click-crear-opcion="$emit('handle-click-crear-opcion', $event)"
                    @handle-click-actualizar-opcion="$emit('handle-click-actualizar-opcion', $event)"
                    @handle-click-eliminar-opcion="$emit('handle-click-eliminar-opcion', $event)"
                />
    
                <p v-if="!hasOpciones" class="text-center font-bold text-sm">{{ isBasico ? 'No Hay Opciones (Minimo 2)' : 'No Hay Opciones' }}</p>
            </div>

            <button 
                v-if="isBasico"
                @click="$emit('handle-click-crear-opcion')"
                class="py-2 px-4 rounded-sm border-2 border-emerald-800 font-extrabold text-emerald-800 flex gap-1 text-sm items-center justify-center hover:bg-emerald-100"
                type="button"
            >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                </svg>
                Agregar
            </button>
        </div>
    </div>

    <div class="flex flex-col sm:flex-row justify-between gap-4 mt-10">
        <button 
            class="py-2 px-4 bg-teal-800 text-center font-bold text-white hover:bg-emerald-900"
            type="button"
            @click="$emit('handle-click-anterior')"
        >
            &#8810; Anterior
        </button>

        <button 
            @click="$emit('handle-click-siguiente')"
            v-if="crearInstrucciones"
            class="py-2 px-4 bg-teal-800 text-center font-bold text-white hover:bg-emerald-900"
            type="button"
        >
            Siguiente &#8811;
        </button>
        
        <button 
            v-else
            @click="handleClickNoAuthorize" 
            class="py-2 px-4 bg-teal-500 text-center font-bold text-white cursor-default"
            type="button"
        >
            Siguiente &#8811;
        </button>
    </div>
</template>