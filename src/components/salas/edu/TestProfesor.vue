<script setup>
    import { computed } from 'vue';
    import { formatearVersion } from '@/helpers';

    const props = defineProps({
        version: {
            type: Object,
            required: true,
        },
    })

    defineEmits([
        'handle-click-enlazar',
        'handle-click-desenlazar',
    ]);

    const canEnlazar = computed(() => {
        return !props?.version?.enlace;
    });
</script>

<template>
    <div class="flex gap-4 items-center">
        <div class="flex-1">
            <p class="font-bold">
                {{ version.nombre }}
            </p>
    
            <p class="text-xs text-slate-600 font-bold">
                {{ formatearVersion(version.version) }}
            </p>
        </div>
    
        <button 
            v-if="canEnlazar"
            @click="$emit('handle-click-enlazar', version.id)"
            type="button" 
            class="p-2 bg-teal-800 hover:bg-teal-900 transition-colors rounded text-white"
        >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4">
                <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
            </svg>
        </button>

        <button 
            v-else
            type="button" 
            @click="$emit('handle-click-desenlazar', version?.enlace[0].id)"
            class="p-2 bg-rose-800 hover:bg-rose-900 transition-colors rounded text-white"
        >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4">
                <path stroke-linecap="round" stroke-linejoin="round" d="M5 12h14" />
            </svg>          
        </button>
    </div>
</template>