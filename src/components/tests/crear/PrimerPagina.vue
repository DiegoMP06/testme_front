<script setup>
    import {FormKit} from '@formkit/vue'

    const props = defineProps({
        test: {
            type: Object,
            required: true,
        },
        selectsCategorias: {
            type: Array,
            required: true,
        },
        selectsTipos: {
            type: Array,
            required: true,
        },
        rules: {
            type: Object,
            required: true,
        },
    });

    const emits = defineEmits([
        'update:nombre-test',
        'update:categoria',
        'update:descripcion-test',
        'handle-click-siguiente',
        'resetear-opciones',
    ]);
</script>

<template>
    <FormKit 
        type="form"
        submit-label="Siguiente &#8811;"
        incomplete-message="Revisa Los Mensajes de Error"
        @submit="$emit('handle-click-siguiente')"
        :value="test"
    >
        <FormKit
            type="text"
            name="nombre"
            label="Nombre: "
            placeholder="Nombre del Test"
            validation="required|length:0,100"
            :validation-messages="rules.nombre"
            @input="$emit('update:nombre-test', $event)"
        />

        <FormKit
            type="select"
            name="categoria_id"
            label="Categoria: "
            validation="required|number"
            :options="selectsCategorias"
            :validation-messages="rules.categoria_id"
            @input="$emit('update:categoria', $event)"
        />

        <FormKit
            type="select"
            name="tipo_id"
            label="Tipo: "
            validation="required|number"
            :options="selectsTipos"
            :validation-messages="rules.tipo_id"
            @input="$emit('resetear-opciones', $event)"
        />
        
        <FormKit
            type="textarea"
            name="descripcion"
            label="Descripcion: "
            placeholder="Describe el Test Aqui"
            validation="required|length:50,1000"
            :validation-messages="rules.descripcion"
            @input="$emit('update:descripcion-test', $event)"
        />
    </FormKit>
</template>