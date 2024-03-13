<script setup>
    const props = defineProps({
        campo: {
            type: Object,
            required: true,
        },
        isExamen: {
            required: true,
        },
        isMultiple: {
            required: true,
        }
    });
</script>

<template>
    <div class="p-2 md:p-4">
        <p class="test-lg font-extrabold text-teal-800">
            {{ campo.pregunta }}
        </p>
        
        <p v-if="isMultiple && campo.extras.multiple" class="text-xs text-teal-700 font-black text-end">* Opcion Multiple</p>

        <div class="space-y-2 pl-4">
            <div v-for="opcion in campo.opciones">
                <p class="text-slate-700 truncate">
                    {{ opcion.opcion }}
                </p>

                <p v-if="isExamen" class="text-xs font-black" :class="[Number(opcion.valor) ? 'text-teal-700' : 'text-red-700']">
                    {{ Number(opcion.valor) ? 'Correcto' : 'Incorrecto' }} 
                </p>

                <p v-else class="text-xs font-black text-slate-700">
                    {{ opcion.valor }} Punto(s)
                </p>
            </div>
        </div>
    </div>
</template>