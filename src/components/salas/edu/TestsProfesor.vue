<script setup>
    import TestProfesor from './TestProfesor.vue';

    defineProps({
        test: {
            type: Object,
            required: true,
        },
    })

    defineEmits([
        'handle-click-enlazar',
        'handle-click-desenlazar',
    ])
</script>

<template>
    <div class="bg-slate-100 divide-y-2 divide-slate-300 p-2 grid gap-4">
        <TestProfesor 
            v-for="version in test.versiones" 
            :version="version"
            @handle-click-enlazar="$emit('handle-click-enlazar', $event)"
            @handle-click-desenlazar="$emit('handle-click-desenlazar', $event)"
        />
    </div>
</template>