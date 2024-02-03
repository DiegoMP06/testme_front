<script setup>
    import { computed } from 'vue';
    import { toast } from 'vue3-toastify';
    import BarraProgreso from '../instrucciones/crear/BarraProgreso.vue';
    import ListadoInstrucciones from '../instrucciones/crear/ListadoInstrucciones.vue';

    const props = defineProps({
        instrucciones: {
            type: Object,
            required: true,
        },
        puntajeActual: {
            type: Number,
            required: true,
        },
        puntajeMaximo: {
            type: Number,
            required: true,
        },
        puntajeMinimo: {
            type: Number,
            required: true,
        },
        hasInstrucciones: {
            required: true,
        },
        getUltimoId: {
            required: true,
        },
        canAddInstrucciones: {
            required: true,
        },
    });

    const emits = defineEmits([
        'handle-click-anterior',
        'handle-click-siguiente',
        'handle-click-crear-instruccion',
        'handle-click-actualizar-instruccion',
        'handle-click-eliminar-instruccion',
    ]);

    const porcentaje = computed(() => {
        const puntos = (props.puntajeMaximo + 1) - props.puntajeMinimo;
        const puntosActual = props.puntajeActual - props.puntajeMinimo;
        return (puntosActual * 100) / puntos;
    });
    
    const canCreate = computed(() => {
        return (props.puntajeActual - 1) === props.puntajeMaximo;
    });

    const handleClickNoAuthorize = () => {
        toast.error('No Has Completado Las Instrucciones');
    }
</script>

<template>
    <div class="md:p-4">
        <BarraProgreso
            :puntaje-actual="puntajeActual"
            :puntaje-minimo="puntajeMinimo"
            :puntaje-maximo="puntajeMaximo"
            :porcentaje="porcentaje"
        />
    </div>

    <ListadoInstrucciones
        :instrucciones="instrucciones"
        :has-instrucciones="hasInstrucciones"
        :get-ultimo-id="getUltimoId"
        :can-add-instrucciones="canAddInstrucciones"
        @handle-click-crear-instruccion="$emit('handle-click-crear-instruccion')"
        @handle-click-actualizar-instruccion="$emit('handle-click-actualizar-instruccion', $event)"
        @handle-click-eliminar-instruccion="$emit('handle-click-eliminar-instruccion')"
    />

    <div class="flex flex-col sm:flex-row justify-between gap-4 mt-10">
        <button 
            class="py-2 px-4 bg-teal-800 text-center font-bold text-white hover:bg-emerald-900"
            type="button"
            @click="$emit('handle-click-anterior')"
        >
            &#8810; Anterior
        </button>

        <button 
            v-if="canCreate"
            @click="$emit('handle-click-siguiente')"
            class="py-2 px-4 bg-teal-800 text-center font-bold text-white hover:bg-emerald-900"
            type="button"
        >
            Siguiente &#8811;
        </button>
        
        <button 
            v-else
            @click="handleClickNoAuthorize" 
            class="py-2 px-4 bg-teal-500 text-center font-bold text-white cursor-default"
            type="button"
        >
            Siguiente &#8811;
        </button>
    </div>
</template>