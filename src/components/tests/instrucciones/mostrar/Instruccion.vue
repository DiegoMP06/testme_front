<script setup>
    import {computed} from 'vue';

    const props = defineProps({
        instruccion: {
            type: Object,
            required: true,
        }
    });

    const isOnePoint = computed(() => {
        return props.instruccion.min === props.instruccion.max ? `Valido a los ${props.instruccion.min} Puntos` : `Valido de ${props.instruccion.min} a ${props.instruccion.max} Puntos`;
    });
</script>
<template>
    <div>
        <p class="text-lg font-bold text-slate-700">
            {{ instruccion.titulo }}
        </p>

        <p class="font-black text-xs my-2 text-teal-800">
            {{ isOnePoint }}
        </p>

        <blockquote class="my-6 text-slate-700">
            {{ instruccion.instruccion }}
        </blockquote> 
    </div>
</template>