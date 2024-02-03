<script setup>
    defineEmits([
        'handle-click-page'
    ]);
</script>

<template>
    <nav class="mb-10 flex gap-4 flex-col md:flex-row">
        <button
            @click="$emit('handle-click-page', 1)"
            class="font-bold bg-teal-800 py-2 px-4 text-white hover:bg-teal-900 flex-1"
            type="button"
        >
            Datos Basicos
        </button>

        <button 
            @click="$emit('handle-click-page', 2)"
            class="font-bold bg-teal-800 py-2 px-4 text-white hover:bg-teal-900 flex-1"
            type="button"
        >
            Campos
        </button>

        <button 
            @click="$emit('handle-click-page', 3)"
            class="font-bold bg-teal-800 py-2 px-4 text-white hover:bg-teal-900 flex-1"
            type="button"
        >
            Instrucciones
        </button>
    </nav>
</template>