<script setup>
    import Header from '@/components/header/Header.vue';

    const enlaces = [
        {
            name: 'auth.login',
            texto: 'Iniciar Sesion',
            middleware: ['guest'],
        },
        {
            name: 'auth.register',
            texto: 'Crear Cuenta',
            middleware: ['guest'],
        }
    ]
</script>

<template>
    <Header :enlaces="enlaces" :submenu="false" />

    <main class="px-4 my-8 md:px-0 container mx-auto mt-36">
        <RouterView/>
    </main>
</template>