<script setup>
    import { FormKit } from '@formkit/vue';

    const props = defineProps({
        version: {
            type: Object,
            required: true,
        },
    });

    defineEmits([
        'handle-submit-nombre',
        'update:nombre',
    ]);

    const rules = {
        required: 'El Nombre es Obligatorio',
        length: 'El Nombre debe Tener Maximo 100 Caracteres'
    };
</script>

<template>
    <div>
        <FormKit 
            type="form"
            submit-label="Guardar Cambios"
            incomplete-message="Revisa Los Mensajes de Error"
            :value="version"
            @submit="$emit('handle-submit-nombre')"
        >
            <FormKit 
                type="text"
                label="Nombre: "
                placeholder="Nombre de la Version"
                name="nombre"
                validation="required|lenght:0,100"
                @input="$emit('update:nombre', $event)"
                :validation-messages="rules"
            />
        </FormKit>
    </div>
</template>