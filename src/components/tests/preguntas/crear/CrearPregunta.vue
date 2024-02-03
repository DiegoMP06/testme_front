<script setup>
    import { computed } from 'vue';
    import {FormKit} from '@formkit/vue'
    import {useModalStore} from '@/stores/modal'

    const modalStore = useModalStore();

    const props = defineProps({
        pregunta: {
            type: Object,
            required: true,
        },
        getCountPregunta: {
            required:  true,
        },
        rules: {
            type: Object,
            required: true,
        },
    });

    const emits = defineEmits([
        'handle-submit-pregunta'
    ]);

    const isEditando = computed(() => {
        return modalStore.editando ? 'Guardar Cambios' : 'Agregar Pregunta';
    });
</script>

<template>
    <div>
        <FormKit 
            type="form"
            :submit-label="isEditando"
            incomplete-message="Revisa Los Mensajes de Error"
            @submit="$emit('handle-submit-pregunta')"
            :value="pregunta"
        >
            <FormKit 
                type="text"
                name="pregunta"
                placeholder="Pregunta"
                :label="`Pregunta ${getCountPregunta}: `"
                validation="required|length:0,100"
                :validation-messages="rules.pregunta"
                v-model="pregunta.pregunta"
            />
        </FormKit>
    </div>
</template>