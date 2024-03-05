<script setup>
    import {computed} from 'vue';
    import {FormKit} from '@formkit/vue'
    import OpcionBasica from './OpcionBasica.vue';
    import CardAcordeon from '@/components/UI/CardAcordeon.vue';

    const props = defineProps({
        campo: {
            type: Object,
            required: true,
        },
        opcionesNormales: {
            type: Array,
            required: true
        },
        isMultiple: {
            required: true,
        },
        isExamen: {
            required: true,
        }
    });

    const emits = defineEmits([
        'handle-click-crear-opcion',
        'handle-click-actualizar-opcion',
        'handle-click-eliminar-opcion',
        'handle-click-multiple',
    ]);
    
    const getOpciones = computed(() => {
        return {...props.opcionesNormales.find(campo => campo.pregunta_token === props.campo.token)};
    });

    const hasOpciones = computed(() => {
        return props.opcionesNormales.find(campo => campo.pregunta_token === props.campo.token).opciones?.length > 0;
    });

    const isIncomplete = computed(() => {
        return {...props.opcionesNormales.find(campo => campo.pregunta_token === props.campo.token)}?.opciones?.length < 2;
    });
</script>

<template>
    <CardAcordeon :animar="true" :class="{'border-2 border-rose-700': isIncomplete}">
        <template v-slot:header>
            <p class="font-extrabold text-teal-800">
                {{ campo.pregunta }}
            </p>
        </template>

        <template v-slot:body>
            <div class="mb-6 space-y-4 divide-y-2 divide-emerald-300">
                <OpcionBasica 
                    v-if="hasOpciones"
                    v-for="opcion in getOpciones.opciones"
                    :key="opcion.token"
                    :campo-id="getOpciones.id"
                    :opcion="opcion"
                    :is-basico="false"
                    :is-number="true"
                    :is-examen="isExamen"
                    @handle-click-actualizar-opcion="$emit('handle-click-actualizar-opcion', $event)"
                    @handle-click-eliminar-opcion="$emit('handle-click-eliminar-opcion', $event)"
                />
    
                <p 
                    v-else
                    class="text-center font-bold text-sm"
                >
                    Este Campo No Tiene Opciones (Minimo 2)
                </p>
            </div>
    
            <button 
                @click="$emit('handle-click-crear-opcion', getOpciones.id)"
                class="py-2 px-4 bg-teal-800 rounded-sm text-center font-bold text-white hover:bg-emerald-900 flex items-center gap-1 text-sm"
                type="button"
            >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                </svg>
                Agregar
            </button>
        </template>

        <template v-slot:footer>
            <div class="pt-4 flex flex-col-reverse gap-4 md:flex-row justify-between">
                <p 
                    class="text-sm font-black"
                    :class="[isIncomplete ? 'text-rose-800' :  'text-teal-800 ']"
                >
                    {{ getOpciones.opciones.length }} Opciones
                </p>

                <FormKit 
                    v-if="isMultiple"
                    type="form"
                    :actions="false"
                    :value="campo.extras"
                >
                    <FormKit 
                        type="checkbox"
                        name="multiple"
                        label="Opcion Multiple"
                        @input="$emit('handle-click-multiple', {pregunta_token: campo.token, multiple: $event})"
                    />
                </FormKit>
            </div>
        </template>
    </CardAcordeon>
</template>