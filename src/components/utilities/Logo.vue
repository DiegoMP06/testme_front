<script setup>
    import imagen from '@/assets/pensando.png';
</script>

<template>
    <p class="text-2xl relative pr-6 font-bold inline-block text-gray-800">
        Test
        <span class="text-sm absolute top-0 right-0">Me</span>
        <span class="absolute bottom-0 right-1"><img :src="imagen" alt="Imagen de Logo" class="w-3 h-3"></span>
    </p>
</template>