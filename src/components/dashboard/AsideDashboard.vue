<script setup>
    import { RouterLink } from 'vue-router'
    import { enlacesDashboard } from '@/helpers';
</script>

<template>
    <aside class="bg-emerald-900 hidden lg:block w-72 2xl:w-80 px-2">
        <nav class="flex flex-col text-center text-gray-200 mt-10">
            <RouterLink 
                v-for="enlace in enlacesDashboard"
                class="py-3 font-bold" 
                active-class="text-white bg-emerald-950"
                :to="{ name: enlace.name}"
            >
                {{ enlace.texto }}
            </RouterLink>
        </nav>
    </aside>
</template>