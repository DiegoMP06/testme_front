<script setup>
    defineProps({
        busqueda: {
            type: String,
            required: true,
        }
    });

    defineEmits([
        'obtener-profesores',
        'update:busqueda'
    ]);
</script>

<template>
    <div class="shadow p-4 rounded max-w-6xl mx-auto mt-10 bg-white">
        <form class="flex items-center gap-4" @submit.prevent="$emit('obtener-profesores')">
            <div class="flex-1 flex flex-col md:flex-row gap-2 md:items-center">
                <label for="profesores" class="text-teal-800 font-bold text-capitalize">Buscar Profesor: </label>

                <input 
                    class="outline-none border-b-2 border-teal-800 px-3 py-1 flex-1 block w-full"
                    type="search" 
                    name="profesores" 
                    id="profesores"
                    placeholder="Profesor"
                    :value="busqueda"
                    @input="$emit('update:busqueda', $event.target.value)"
                />
            </div>

            <button type="submit" class="p-1 rounded-full bg-teal-800 hover:bg-teal-900 text-white">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                    <path stroke-linecap="round" stroke-linejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                </svg>                          
            </button>
        </form>
    </div>
</template>