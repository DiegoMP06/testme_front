<script setup>
    import { computed } from 'vue';
    import {FormKit} from '@formkit/vue'
    import {useModalStore} from '@/stores/modal'

    const modalStore = useModalStore();

    const props = defineProps({
        opcion: {
            type: Object,
            required: true,
        },
        getCountOpcion: {
            required: true,
        },
        isNumber: {
            type: Boolean,
            required: true,
        },
        isExamen: {
            required:  true,
        },
        rules: {
            type: Object,
            required: true,
        },
    });

    const emits = defineEmits([
        'handle-submit-opcion'
    ]);

    const isEditando = computed(() => {
        return modalStore.editando ? 'Guardar Cambios' : 'Agregar Opcion';
    });
</script>

<template>
    <div>
        <FormKit 
            type="form"
            :submit-label="isEditando"
            incomplete-message="Revisa Los Mensajes de Error"
            @submit="$emit('handle-submit-opcion')"
            :value="opcion"
        >
            <FormKit 
                type="text"
                name="opcion"
                placeholder="Opcion"
                :label="`Opcion ${getCountOpcion}: `"
                validation="required|length:0,100"
                :validation-messages="rules.opcion"
                v-model="opcion.opcion"
            />

            <FormKit
                v-if="!isExamen"
                :type="isNumber ? 'number' :  'text'"
                name="valor"
                placeholder="Valor ej. 3"
                label="Valor: "
                :validation="isNumber ? 'required|number|min:1|max:20': 'required|length:0,80'"
                :validation-messages="rules.valor"
                v-model="opcion.valor"
            />
        </FormKit>
    </div>
</template>