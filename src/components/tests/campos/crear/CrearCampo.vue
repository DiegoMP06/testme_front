<script setup>
    import { computed} from 'vue';
    import {FormKit} from '@formkit/vue'
    import {useModalStore} from '@/stores/modal'

    const modalStore = useModalStore();

    const props = defineProps({
        campo: {
            type: Object,
            required: true,
        },
        hasPlaceholder: {
            required: true,
        },
        hasType: {
            required: true,
        },
        isNumeric: {
            required: true,
        },
        selectsCampos: {
            type: Array,
            required: true,
        },
        rules: {
            type: Object,
            required: true,
        },
    });

    const emits = defineEmits([
        'resetear-campo',
        'handle-submit-campo',
    ]);

    const isEditando = computed(() => {
        return modalStore.editando ? 'Guardar Cambios' : 'Agregar Campó';
    });
</script>

<template>
    <div>
        <FormKit 
            type="form"
            :submit-label="isEditando"
            incomplete-message="Revisa Los Mensajes de Error"
            @submit="$emit('handle-submit-campo')"
            :value="campo"
        >
            <FormKit
                type="select"
                name="type"
                label="Tipo de Campo: "
                validation="required"
                :options="selectsCampos"
                :validation-messages="rules.campo.tipo"
                @input="$emit('resetear-campo', $event)"
            />

            <div 
                v-if="hasType"
                class="formkit-form"
            >
                <FormKit 
                    type="text"
                    name="campo"
                    label="Campo: "
                    placeholder="Encabezado del Campo"
                    validation="required|length:0,80"
                    :validation-messages="rules.campo.campo"
                    v-model="campo.pregunta"
                />

                <FormKit 
                    v-if="hasPlaceholder"
                    type="text"
                    name="placeholder"
                    label="Texto Guia: "
                    placeholder="Texto Guia del Campo"
                    validation="length:0,80"
                    :validation-messages="rules.campo.placeholder"
                    v-model="campo.extras.placeholder"
                />

                <div 
                    v-if="isNumeric"
                    class="formkit-form"
                >
                    <FormKit 
                        type="number"
                        name="min"
                        label="Numero Minimo: "
                        placeholder="Numero Minimo"
                        validation="number"
                        :validation-messages="rules.campo.min"
                        v-model="campo.extras.min"
                    />

                    <FormKit 
                        type="number"
                        name="max"
                        label="Numero Maximo: "
                        placeholder="Numero Maximo"
                        validation="number"
                        :validation-messages="rules.campo.max"
                        v-model="campo.extras.max"
                    />

                    <FormKit 
                        type="checkbox"
                        name="entero"
                        label="Solo Enteros: "
                        v-model="campo.extras.int"
                    />
                </div>

                <FormKit 
                    type="checkbox"
                    name="required"
                    label="Obligatorio: "
                    v-model="campo.required"
                />
            </div>
        </FormKit>
    </div>
</template>