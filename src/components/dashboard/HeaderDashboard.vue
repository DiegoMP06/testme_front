<script setup>
    import Logo from '@/components/utilities/Logo.vue';
    import EnlaceDesktop from '@/components/header/EnlaceDesktop.vue';
    import EnlaceMovil from '@/components/header/EnlaceMovil.vue';
    import { enlaces, enlacesUser } from '@/helpers';
    import EnlacePerfil from '@/components/utilities/EnlacePerfil.vue';
    import { useAuthStore } from '@/stores/auth';
    import useHeader from '@/composables/useHeader';
    import MenuMobileDashboard from '@/components/dashboard/MenuMobileDashboard.vue'
    import MenuUserDashboard from '@/components/dashboard/MenuUserDashboard.vue'

    const authStore = useAuthStore();
    
    const { 
        handleClickMenuUser,
        isOpenMenuUser,
        isAnimarUser,
        handleClickMenu, 
        isOpenMenu, 
        isAnimar, 
        handleClickSubMenu, 
        isOpenSubMenu, 
        isSubAnimar,
    } = useHeader();
</script>

<template>
    <header class="bg-teal-800 py-2.5 shadow-md z-10">
        <div class="container mx-auto px-4 flex justify-between items-center">
            <RouterLink class="invert" :to="{ name: 'dashboard.admin' }">
                <Logo />
            </RouterLink>

            <nav class="hidden md:flex flex-row items-center gap-4 text-gray-100">
                <EnlaceDesktop 
                    v-for="enlace in enlaces" 
                    :enlace="enlace"
                />

                <button v-if="authStore.isAuth" @click="handleClickMenuUser">
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

        <MenuMobileDashboard 
            :is-animar="isAnimar"
            :is-open-menu="isOpenMenu"
            @handle-click-menu="handleClickMenu"
        >
            <EnlaceMovil 
                v-for="enlace in enlaces"
                :enlace="enlace"
            />
            <EnlaceMovil 
                v-for="enlace in enlacesUser"
                :enlace="enlace"
                :params="{user: authStore.user.usuario}"
            />
        </MenuMobileDashboard>

        <MenuUserDashboard 
            :is-animar-user="isAnimarUser"
            :is-open-menu-user="isOpenMenuUser"
            @handle-click-menu-user="handleClickMenuUser"
        >
            <EnlaceMovil 
                v-for="enlace in enlacesUser"
                :enlace="enlace"
                :params="{user: authStore.user.usuario}"
            />
        </MenuUserDashboard>
    </header>
</template>