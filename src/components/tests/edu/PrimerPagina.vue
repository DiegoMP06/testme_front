<script setup>
    import { RouterLink } from 'vue-router';
    import { FormKit } from '@formkit/vue';
    import CampoEdu from '@/components/tests/preguntas/edu/CampoEdu.vue';

    const props = defineProps({
        test: {
            type: Object,
            required: true,
        },
        isCreador: {
            type: Boolean,
            required: true
        }
    });

    const emits = defineEmits([
        'handle-click-submit'
    ]);
</script>

<template>
    <div class="p-2">
        <FormKit 
            type="form"
            submit-label="Enviar"
            incomplete-message="Revisa Los Mensajes de Error"
            @submit="$emit('handle-click-submit', $event)"
            :actions="!isCreador"
        >
            <CampoEdu
                v-for="campo in test.camposExtra"
                :key="campo.id"
                :campo="campo"
            />

            <CampoEdu
                v-for="campo in test.campos"
                :key="campo.id"
                :campo="campo"
            />
        </FormKit>
    </div>
</template>