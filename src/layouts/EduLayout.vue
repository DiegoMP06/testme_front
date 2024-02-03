<script setup>
    import Header from '@/components/header/Header.vue';
    import { enlaces } from '@/helpers';
    
</script>

<template>
    <Header :enlaces="enlaces" :submenu="false" />

    <main class="px-4 my-8 md:px-0 container mx-auto mt-36">
        <RouterView/>
    </main>
</template>