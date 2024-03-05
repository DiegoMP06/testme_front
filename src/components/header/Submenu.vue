<script setup>
    import Logo from '@/components/utilities/Logo.vue';
    import EnlaceDesktop from './EnlaceDesktop.vue';
    import EnlaceMovil from './EnlaceMovil.vue';
    import EnlacePerfil from '../utilities/EnlacePerfil.vue';

    defineProps({
        isSubAnimar: {
            required: true,
        },
        isOpenSubMenu: {
            required: true,
        }
    });

    defineEmits([
        'handle-click-sub-menu',
    ]);
</script>

<template>
    <div class="bg-teal-700 px-4 py-2 z-50">
        <button type="button" class="p-2 hover:bg-emerald-950 rounded block md:hidden" @click="$emit('handle-click-sub-menu')">
            <span class="text-white">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                    stroke="currentColor" class="w-8 h-8">
                    <path stroke-linecap="round" stroke-linejoin="round"
                        d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                </svg>
            </span>
        </button>
        
        <div 
            :class="[isSubAnimar ? 'translate-x-0 opacity-100' : 'translate-submenu opacity-0']" 
            v-if="isOpenSubMenu"
            class="flex fixed top-0 left-0 bottom-0 right-0 transition-all"
        >  
            <div class="bg-teal-700 px-4 py-2 w-2/3  md:hidden">
                <div class="block">
                    <button  type="button" class="p-2 hover:bg-emerald-950 rounded"
                        @click="$emit('handle-click-sub-menu')">
                        <span class="text-white">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                                stroke="currentColor" class="w-8 h-8">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
                            </svg>
                        </span>
                    </button>                    
    
                    <div class="py-4" v-if="isOpenSubMenu">
                        <slot></slot>
                    </div>
                </div>
            </div>

            <div 
                @click="$emit('handle-click-sub-menu')"
            class="flex-1"
        ></div>
        </div>

        <div class="hidden md:block">
            <slot></slot>
        </div>
    </div>
</template>