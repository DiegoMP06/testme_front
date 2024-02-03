<script setup>
    import { computed } from 'vue';
    import { FormKit } from '@formkit/vue';

    const props = defineProps({
        campo: {
            type: Object,
            required: true
        }
    });

    const rules = {
        required: 'El Campo es Obligatorio',
        max: `El Valor Debe de Ser Menor o igual a ${props.campo?.extras?.max}`,
        min: `El Valor Debe de Ser Mayor o igual a ${props.campo?.extras?.min}`,
        number: 'El Valor debe de Ser un Numero',
    };

    function formatearOpciones() {
        return props.campo?.opciones.map(({opcion: label, id: value}) => {
            return {
                label,
                value,
            }
        });
    }

    const isRequired = computed(() => {
        return props.campo.required;
    });

    const isNumber = computed(() => {
        return props.campo.type === 'number';
    });

    const hasMin = computed(() => {
        return props.campo?.extras?.min || props.campo?.extras?.min === 0 ? `|min:${props.campo.extras?.min}` : '';
    });

    const hasMax = computed(() => {
        return props.campo?.extras?.max || props.campo?.extras?.max === 0 ? `|max:${props.campo.extras?.max}` : '';
    });

    const isInt = computed(() => {
        return props.campo.extras?.int ? '1' : 'any'
    });

    const isText = computed(() => {
        return props.campo.type === 'text' || props.campo.type === 'textarea';
    });
</script>

<template>
    <FormKit 
        v-if="isNumber"
        :type="campo.type"
        :name="campo.id"
        :label="campo.campo"
        :placeholder="campo.extras?.placeholder"
        :validation="'number' + (isRequired ? '|required' : '') + hasMin + hasMax"
        :validation-messages="rules"
        :min="campo.extras?.min"
        :max="campo.extras?.max"
        :step="isInt"
    />

    <FormKit 
        v-else-if="isText"
        :type="campo.type"
        :name="campo.id"
        :label="campo.campo"
        :placeholder="campo.extras?.placeholder"
        :validation="`${isRequired ? 'required' : ''}`"
        :validation-messages="rules"
    />

    <FormKit 
        v-else
        :label="campo.pregunta"
        :type="campo.type"
        :name="campo.id"
        :validation="`${isRequired ? 'required' : ''}`"
        :validation-messages="rules"
        :options="formatearOpciones()"
    />
</template>