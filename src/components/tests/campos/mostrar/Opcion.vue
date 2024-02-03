<script setup>
    const props = defineProps({
        opcion: {
            type: Object,
            required: true,
        },
    });
</script>

<template>
    <div>
        <p class="truncate text-slate-700">
            {{ opcion?.opcion }}
        </p>
    
        <p class="text-xs font-black text-slate-700">
            {{ opcion?.valor }}
        </p>
    </div>
</template>