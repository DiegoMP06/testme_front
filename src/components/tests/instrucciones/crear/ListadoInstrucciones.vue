<script setup>
    import Instruccion from './Instruccion.vue';

    const props = defineProps({
        instrucciones: {
            type: Array,
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
        'handle-click-crear-instruccion',
        'handle-click-actualizar-instruccion',
        'handle-click-eliminar-instruccion',
    ]);
</script>

<template>
    <div class="bg-emerald-50 p-2 mt-6">
        <h3 class="text-xl font-black text-teal-800">Instrucciones: </h3>

        <div class="my-6 divide-y-2 divide-emerald-500">
            <Instruccion
                v-if="hasInstrucciones"
                v-for="instruccion in instrucciones"
                :key="instruccion.id"
                :instruccion="instruccion"
                :get-ultimo-id="getUltimoId"
                @handle-click-actualizar-instruccion="$emit('handle-click-actualizar-instruccion', $event)"
                @handle-click-eliminar-instruccion="$emit('handle-click-eliminar-instruccion')"
            />

            <p v-else class="text-center font-bold text-xs">No Hay Instrucciones</p>
        </div>

        <button 
            v-if="canAddInstrucciones"
            @click="$emit('handle-click-crear-instruccion')"
            class="py-2 px-4 bg-teal-800 rounded-sm text-center font-bold text-white hover:bg-emerald-900 flex items-center gap-1 text-sm"
            type="button"
        >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4">
                <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
            </svg>
            Agregar
        </button>
    </div>
</template>