<script setup>
    import { useModalStore } from '@/stores/modal';
    import { FormKit } from '@formkit/vue';

    const modalStore = useModalStore();

    defineEmits([
        'update:password',
        'handle-submit-password',
    ]);

    const rules = {
        required: 'La Clave Es Obligatoria',
        length: 'La Clave Debe Tener Entre 6 y 20 Caracteres',
    };
</script>

<template>
    <div>
        <FormKit 
            type="form"
            submit-label="Guardar Cambios"
            incomplete-message="Revisa Los Mensajes de Error"
            @submit="$emit('handle-submit-password')"
        >
            <FormKit 
                type="password"
                :label="modalStore.editando ? `Nueva Clave de Ingreso: ` :  `Clave de Ingreso: `"
                placeholder="Clave de la Sala"
                name="password"
                validation="required|length:6,20"
                @input="$emit('update:password', $event)"
                :validation-messages="rules"
            />
        </FormKit>
    </div>
</template>