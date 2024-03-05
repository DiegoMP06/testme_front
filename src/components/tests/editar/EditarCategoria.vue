<script setup>
    import { FormKit } from '@formkit/vue';

    const props = defineProps({
        version: {
            type: Object,
            required: true,
        },
        selectsCategorias: {
            type: Object,
            required: true,
        }
    });

    defineEmits([
        'handle-submit-categoria',
    ]);

    const rules = { 
        required: 'La Categoria es Obligatoria',
        number: 'La Categoria No Es Valida'
    };
</script>

<template>
    <div>
        <FormKit 
            type="form"
            submit-label="Guardar Cambios"
            incomplete-message="Revisa Los Mensajes de Error"
            :value="version"
            @submit="$emit('handle-submit-categoria')"
        >
            <FormKit
                type="select"
                name="categoria_id"
                label="Categoria: "
                validation="required|number"
                :options="selectsCategorias"
                :validation-messages="rules"
                v-model="version.categoria_id"
            />
        </FormKit>
    </div>
</template>