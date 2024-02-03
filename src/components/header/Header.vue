<script setup>
    import { useAuthStore } from '@/stores/auth';
    import useHeader from '@/composables/useHeader'
    import Logo from '@/components/utilities/Logo.vue';
    import EnlaceDesktop from './EnlaceDesktop.vue';
    import Submenu from './Submenu.vue';
    import MenuMobile from './MenuMobile.vue';
    import EnlacePerfil from '../utilities/EnlacePerfil.vue';
    import EnlaceMovil from './EnlaceMovil.vue';

    const authStore = useAuthStore();
    const {handleClickMenu, isOpenMenu, isAnimar, handleClickSubMenu, isOpenSubMenu, isSubAnimar} = useHeader();

    defineProps({
        enlaces: {
            type: Array,
            required: true,
        },
        submenu: {
            type: [null, Boolean],
            required: true,
        }
    });
</script>

<template>
    <header 
        class="bg-emerald-200 border-b-4 border-teal-800 fixed top-0 left-0 right-0"
    >
        <div class="px-4 py-4 md:px-0 mx-auto container flex flex-row justify-between items-center gap-8">
            <RouterLink :to="{name: 'bienvenida'}">
                <Logo />
            </RouterLink>

            <nav class="hidden md:flex flex-row items-center gap-4 text-gray-800">
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

            <button 
                @click="handleClickMenu"
                type="button" 
                class="md:hidden text-emerald-700 hover:text-green-900 transition-colors"
            >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-10 h-10">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 5.25h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5" />
                </svg>                  
            </button>
        </div>

        <MenuMobile
            :is-animar="isAnimar"
            :is-open-menu="isOpenMenu"
            @handle-click-menu="handleClickMenu"
        >
            <EnlaceMovil 
                v-for="enlace in enlaces" 
                :name="enlace.name"
                :middleware="enlace.middleware"
            >
                {{ enlace.texto }}
            </EnlaceMovil>
        </MenuMobile>

        <Submenu
            v-if="submenu"
            :is-sub-animar="isSubAnimar"
            :is-open-sub-menu="isOpenSubMenu"
            @handle-click-sub-menu="handleClickSubMenu"
        >
            <slot name="submenu"></slot>
        </Submenu>
    </header>
</template>