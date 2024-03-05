<script setup>
    import { FormKit } from '@formkit/vue';

    defineProps({
        errores: {
            required: true,
            type: Array,
        }
    });

    defineEmits([
        'handle-submit-password',
        'update:password',
    ]);

    const rules = {
        required: 'La Clave es Obligatoria',
    };
</script>

<template>
    <div>
        <FormKit 
            type="form"
            submit-label="Unirse"
            incomplete-message="Revisa Los Mensajes de Error"
            @submit="$emit('handle-submit-password')"
        >
            <p v-for="error in errores" class="formkit-message">
                {{ error }}
            </p>
        
            <FormKit 
                type="password"
                label="Clave de Ingreso: "
                placeholder="Clave de la Sala"
                name="password"
                validation="required"
                @input="$emit('update:password', $event)"
                :validation-messages="rules"
            />
        </FormKit>
    </div>
</template>