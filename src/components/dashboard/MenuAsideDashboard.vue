<script setup>
    import { enlacesDashboard } from '@/helpers';
    import useHeader from '@/composables/useHeader';

    
    const { 
        handleClickSubMenu, 
        isOpenSubMenu, 
        isSubAnimar, 
    } = useHeader();
</script>

<template>
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
            class="flex flex-col text-center text-gray-200 animar">
            <RouterLink 
                v-for="enlace in enlacesDashboard"
                class="py-3 font-bold" 
                active-class="bg-emerald-950 text-white" :to="{ name: enlace.name }"
            >
                {{ enlace.texto }}
            </RouterLink>
        </nav>
    </div>
</template>
