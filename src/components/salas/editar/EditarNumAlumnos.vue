<script setup>
    import { FormKit } from '@formkit/vue';

    const props = defineProps({
        sala: {
            type: Object,
            required: true,
        },
    });

    defineEmits([
        'update:num-alumnos',
        'handle-submit-num-alumnos'
    ]);

    const rules = {
        required: 'La Cantidad de Alumnos es Obligatoria',
        number: 'La Cantidad de Alumnos es Invalida',
        min: 'La Cantidad de Alumnos debe Ser Mayor o Igual a 1',
        max: 'La Cantidad de Alumnos debe Ser Menor o Igual a 1000'
    };
</script>

<template>
    <div>
        <FormKit 
            type="form"
            submit-label="Guardar Cambios"
            incomplete-message="Revisa Los Mensajes de Error"
            :value="sala"
            @submit="$emit('handle-submit-num-alumnos')"
        >
            <FormKit 
                type="number"
                label="Cantidad Maxima de Alumnos: "
                placeholder="Ej. 20"
                name="num_alumnos"
                validation="required|number|min:1|max:1000"
                min="1"
                max="1000"
                @input="$emit('update:num-alumnos', $event)"
                :validation-messages="rules"
            />
        </FormKit>
    </div>
</template>