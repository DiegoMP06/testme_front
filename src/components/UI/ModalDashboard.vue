<script setup>
    import {useModalStore} from '@/stores/modal'
    import Spinner2 from './Spinner2.vue';
    const modalStore = useModalStore();

    defineProps([
        'subCargando'
    ]);

    defineEmits([
        'quitar-modal'
    ]);
</script>

<template>
    <div class="fixed top-0 left-0 right-0 bottom-0 modal">
        <button 
            v-if="!subCargando"
            @click="$emit('quitar-modal')"
            class="fixed top-4 right-4 text-white"
        >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-10 h-10">
                <path stroke-linecap="round" stroke-linejoin="round" d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
            </svg>              
        </button>

        <div v-if="subCargando">
            <Spinner2 />
        </div>

        <div 
            v-else
            :class="{'mover-modal' : !modalStore.isAnimar}"
            class="max-w-3xl p-4 overflow-auto bg-white mx-auto contenedor-modal animar">
            <slot></slot>
        </div>
    </div>
</template>

<style scoped>
    .modal {
        background-color: rgba(0 0 0 / 0.4);
    }

    .contenedor-modal {
        width: 95%;
        position: relative;
        max-height: 80vh;
        transform: translateY(-50%);
        top: 50%;
        left: 0;
        right: 0;
    }

    .mover-modal {
        transform: translateY(-100rem);
    }
</style>