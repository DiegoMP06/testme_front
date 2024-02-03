<script setup>
    import { FormKit } from '@formkit/vue';

    const props = defineProps({
        sala: {
            type: Object,
            required: true,
        },
    });

    defineEmits([
        'update:nombre',
        'handle-submit-nombre'
    ]);

    const rules = {
        required: 'El Nombre es Obligatorio',
        lenght: 'El Nombre debe Tener Maximo 100 Caracteres'
    };
</script>

<template>
    <div>
        <FormKit 
            type="form"
            submit-label="Guardar Cambios"
            incomplete-message="Revisa Los Mensajes de Error"
            :value="sala"
            @submit="$emit('handle-submit-nombre')"
        >
            <FormKit 
                type="text"
                label="Nombre: "
                placeholder="Nombre de la Sala"
                name="nombre"
                validation="required|lenght:0,100"
                @input="$emit('update:nombre', $event)"
                :validation-messages="rules"
            />
        </FormKit>
    </div>
</template>