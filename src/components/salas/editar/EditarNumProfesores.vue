<script setup>
    import { FormKit } from '@formkit/vue';

    const props = defineProps({
        sala: {
            type: Object,
            required: true,
        },
    });

    defineEmits([
        'update:num-profesores',
        'handle-submit-num-profesores',
    ]);

    const rules = {
        number: 'La Cantidad de Profesores es Invalida',
        min: 'La Cantidad de Profesores debe Ser Mayor o Igual a 0',
        max: 'La Cantidad de Profesores debe Ser Menor o Igual a 20'
    };
</script>

<template>
    <div>
        <FormKit 
            type="form"
            submit-label="Guardar Cambios"
            incomplete-message="Revisa Los Mensajes de Error"
            :value="sala"
            @submit="$emit('handle-submit-num-profesores')"
        >
            <FormKit 
                type="number"
                label="Cantidad Maxima de Profesores Colegas: "
                placeholder="Ej. 20"
                name="num_profesores"
                validation="number|max:20|min:0"
                min="0"
                max="20"
                @input="$emit('update:num-profesores', $event)"
                :validation-messages="rules"
            />
        </FormKit>
    </div>
</template>