<script setup>
    import {computed} from 'vue';
    import Opcion from './Opcion.vue'

    const props = defineProps({
        campo: {
            type: Object,
            required: true,
        }
    });

    const inputsCampos = {
        text: 'Campo de Texto',
        textarea: 'Campo de Texto Multilinea',
        number: 'Campo Numerico',
        radio: 'Opciones',
        select: 'Listado de Opciones',
        checkbox: 'Opciones Multiples',
    };

    const hasOpciones = computed(() => {
        return props.campo.type === 'radio' || props.campo.type === 'select' || props.campo.type === 'checkbox';
    });
</script>

<template>
    <div class="p-2 md:p-4">
        <p class="text-lg text-teal-800 font-extrabold">
            {{ campo.pregunta }}
        </p>

        <p class="text-sm font-bold text-slate-700">
            {{ inputsCampos[campo.type] }}
        </p>

        <div v-if="hasOpciones" class="space-y-2 pl-4">
            <Opcion 
                v-for="opcion in campo.opciones"
                :key="opcion.id"
                :opcion="opcion"
            />
        </div>
    </div>
</template>