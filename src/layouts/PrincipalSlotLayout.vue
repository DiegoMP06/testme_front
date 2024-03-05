<script setup>
    import Header from '@/components/header/Header.vue';

    defineProps({
        submenu: {
            type: [Boolean, null],
        }
    });
</script>

<template>
    <Header :submenu="submenu">
        <template v-slot:submenu>
            <slot name="submenu"></slot>
        </template>
    </Header>

    <main class="px-4 my-8 container mx-auto mt-24">
        <slot name="contenido"></slot>
    </main>
</template>