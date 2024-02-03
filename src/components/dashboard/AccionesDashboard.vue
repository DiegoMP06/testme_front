<script setup>
    import {RouterLink} from 'vue-router';

    defineProps({
        opciones: {
            type: Object,
            required: true,
        }
    });
</script>

<template>
    <div class="p-3 mt-6">
        <RouterLink
            class="border-2 border-teal-800 py-1 px-4 rounded-md text-teal-800 font-extrabold bg-emerald-100 hover:bg-emerald-200 inline-block text-center"
            :to="opciones"
        >
            <slot></slot>
        </RouterLink>
    </div>
</template>