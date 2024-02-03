<script setup>
    import { RouterLink } from 'vue-router'
    import useHeader from '@/composables/useHeader'
    import Logo from '@/components/utilities/Logo.vue';
    import EnlaceDesktop from '@/components/header/EnlaceDesktop.vue';
    import EnlaceMovil from '@/components/header/EnlaceMovil.vue';
    import { enlaces } from '@/helpers';
    import EnlacePerfil from '../components/utilities/EnlacePerfil.vue';
    import { useAuthStore } from '@/stores/auth';

    const authStore = useAuthStore();

    const { handleClickSubMenu, handleClickMenu, isOpenSubMenu, isOpenMenu, isSubAnimar, isAnimar } = useHeader();

    const enlacesDashboard = [
        {
            name: 'dashboard.admin',
            texto: 'Mi Espacio',
            middleware: ['auth', 'teacher']
        },
        {
            name: 'dashboard.tests',
            texto: 'Tests',
            middleware: ['auth', 'teacher']
        },
        {
            name: 'dashboard.salas',
            texto: 'Salas',
            middleware: ['auth', 'teacher']
        },
    ];
</script>

<template>
    <div class="flex min-h-screen lg:h-screen flex-col">
        <header class="bg-teal-800 py-4 shadow-md">
            <div class="container mx-auto px-2 flex justify-between items-center">
                <RouterLink class="invert" :to="{ name: 'dashboard.admin' }">
                    <Logo />
                </RouterLink>

                <nav class="hidden md:flex flex-row items-center gap-4 text-gray-100">
                    <EnlaceDesktop 
                        v-for="enlace in enlaces" 
                        :name="enlace.name"
                        :middleware="enlace.middleware"
                    >
                        {{ enlace.texto }}
                    </EnlaceDesktop>

                    <button v-if="authStore.isAuth">
                        <EnlacePerfil />
                    </button>
                </nav>

                <button @click="handleClickMenu" type="button"
                    class="md:hidden text-white hover:text-gray-200 transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                        stroke="currentColor" class="w-10 h-10">
                        <path stroke-linecap="round" stroke-linejoin="round"
                            d="M3.75 5.25h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5" />
                    </svg>
                </button>
            </div>

            <div :class="[isAnimar ? 'translate-x-0 opacity-100' : 'translate-x-96 opacity-0']" v-if="isOpenMenu"
                class="md:hidden fixed top-0 bottom-0 left-0 right-0 flex transition-all  z-50">
                <button @click="handleClickMenu" type="button"
                    class="fixed top-5 left-5 bg-red-400 p-1 rounded-full hover:bg-red-600 text-gray-100">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                        stroke="currentColor" class="w-8 h-8">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
                    </svg>
                </button>

                <div @click="handleClickMenu" class="flex-1"></div>

                <div class="bg-emerald-800 w-2/3 border-l-2 border-l-gray-100">
                    <nav class="px-4 mt-8 flex flex-col text-gray-100">
                        <RouterLink :to="{}" class="mb-6" v-if="authStore.isAuth">
                            <EnlacePerfil />
                        </RouterLink>

                        <EnlaceMovil 
                            class="" 
                            v-for="enlace in enlaces" 
                            :name="enlace.name"
                            :middleware="enlace.middleware"
                        >
                            {{ enlace.texto }}
                        </EnlaceMovil>
                    </nav>
                </div>
            </div>
        </header>

        <div class="bg-emerald-900 p-2 lg:hidden">
            <div class="mb-2">
                <button v-if="isOpenSubMenu" type="button" class="p-2 hover:bg-emerald-950 rounded"
                    @click="handleClickSubMenu">
                    <span class="text-white">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                            stroke="currentColor" class="w-8 h-8">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
                        </svg>
                    </span>
                </button>

                <button v-else type="button" class="p-2 hover:bg-emerald-950 rounded" @click="handleClickSubMenu">
                    <span class="text-white">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                            stroke="currentColor" class="w-8 h-8">
                            <path stroke-linecap="round" stroke-linejoin="round"
                                d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                        </svg>
                    </span>
                </button>
            </div>

            <nav :class="[isSubAnimar ? 'barra-secundaria opacity-100' : 'max-h-0 opacity-0 overflow-hidden barra-secunaria-activa']"
                class="flex flex-col text-center divide-y-2 text-gray-100 animar">
                <RouterLink 
                    v-for="enlace in enlacesDashboard"
                    class="py-3 font-bold text-lg" 
                    active-class="bg-emerald-950" :to="{ name: enlace.name }"
                >
                    {{ enlace.texto }}
                </RouterLink>
            </nav>
        </div>

        <div class="flex-1 flex overflow-y-auto">
            <aside class="bg-emerald-900 hidden lg:block w-80 2xl:w-96 px-6">
                <nav class="flex flex-col text-center divide-y-2 text-gray-100 mt-10">
                    <RouterLink 
                        v-for="enlace in enlacesDashboard"
                        class="py-3 font-extrabold text-lg" 
                        active-class="text-emerald-200"
                        :to="{ name: enlace.name}"
                    >
                        {{ enlace.texto }}
                    </RouterLink>
                </nav>
            </aside>

            <main class="px-4 py-8 flex-1 overflow-y-auto relative">
                <div class="container mx-auto">
                    <RouterView />
                </div>
            </main>
        </div>
    </div>
</template>