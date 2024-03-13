<script setup>
    import { formatearVersion } from '@/helpers';
    import { RouterLink } from 'vue-router';

    defineProps({
        version: {
            required: true,
            type: Object,
        }
    });
</script>

<template>
    <div class="bg-gray-100 hover:bg-gray-200 transition-colors p-4 grid gap-1">
        <RouterLink class="text-slate-700 font-extrabold truncate text-lg" :to="{name: 'dashboard.tests.version', params: {testId: version.test_id, versionId: version.id}}">
            {{ version.nombre }}
        </RouterLink>

        <p class="text-xs text-slate-700">
            {{ formatearVersion(version.version) }}
        </p>
    </div>
</template>