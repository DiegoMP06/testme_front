<script setup>
    import { computed } from 'vue';
    import {FormKit} from '@formkit/vue'
    import {useModalStore} from '@/stores/modal'

    const modalStore = useModalStore();

    const props = defineProps({
        instruccion: {
            type: Object,
            required: true,
        },
        puntajeMaximo: {
            type: Number,
            required: true,
        },
        puntajeActual: {
            type: Number,
            required: true,
        },
        rules: {
            type: Object,
            required: true,
        },
    });
    
    const emits = defineEmits([
        'handle-submit-instruccion',
    ]);

    const isEditando = computed(() => {
        return modalStore.editando ? 'Guardar Cambios' : 'Agregar Instruccion';
    });

    const isNotEditando = computed(() => {
        return !modalStore.editando;
    });
</script>

<template>
    <div>
        <FormKit 
            type="form"
            :submit-label="isEditando"
            incomplete-message="Revisa Los Mensajes de Error"
            @submit="$emit('handle-submit-instruccion')"
            :value="instruccion"
        >
            <FormKit 
                type="text"
                name="titulo"
                placeholder="Titulo de La Instruccion"
                label="Titulo: "
                validation="required|length:0,100"
                :validation-messages="rules.instruccion.titulo"
                v-model="instruccion.titulo"
            />

            <FormKit 
                v-if="isNotEditando"
                type="number"
                name="max"
                placeholder="Puntaje Maximo"
                label="Puntaje Maximo: "
                :help="`De ${puntajeActual} a ${puntajeMaximo} Puntos`"
                :validation="`required|numeric|min:${puntajeActual}|max:${puntajeMaximo}`"
                :validation-messages="rules.instruccion.max"
                :min="puntajeActual"
                :max="puntajeMaximo"
                v-model="instruccion.max"
            />

            <FormKit 
                type="textarea"
                name="instruccion"
                placeholder="Contenido de la Instruccion"
                label="Instruccion: "
                validation="required|length:0,1000"
                :validation-messages="rules.instruccion.instruccion"
                v-model="instruccion.instruccion"
            />
        </FormKit>
    </div>
</template>