<script setup>
    import imagen from '@/assets/pensando.png';
</script>

<template>
    <p class="text-4xl relative pr-8 font-bold inline-block text-gray-800">
        Test
        <span class="text-lg absolute top-0 right-0">Me</span>
        <span class="absolute bottom-0 right-2"><img :src="imagen" alt="Imagen de Logo" class="w-4 h-4"></span>
    </p>
</template>