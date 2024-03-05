<script setup>
    import Header from '@/components/header/Header.vue';
</script>

<template>
    <Header :submenu="false" />

    <main class="px-4 my-8 container mx-auto mt-24">
        <RouterView/>
    </main>
</template>