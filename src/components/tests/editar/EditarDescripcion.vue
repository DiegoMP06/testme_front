<script setup>
    import { FormKit } from '@formkit/vue';

    const props = defineProps({
        version: {
            type: Object,
            required: true,
        },
    });

    defineEmits([
        'handle-submit-descripcion',
        'update:descripcion',
    ]);

    const rules = {
        required: 'La Descripcion Es Obligatoria',
        length: 'La Descripcion Debe Tener entre 50 y 1000 Caracteres',
    };
</script>

<template>
    <div>
        <FormKit 
            type="form"
            submit-label="Guardar Cambios"
            incomplete-message="Revisa Los Mensajes de Error"
            :value="version"
            @submit="$emit('handle-submit-descripcion')"
        >
            <FormKit 
                type="textarea"
                label="Descripcion: "
                placeholder="Descipcion de la Version"
                name="descripcion"
                validation="required|lenght:50,1000"
                @input="$emit('update:descripcion', $event)"
                :validation-messages="rules"
            />
        </FormKit>
    </div>
</template>