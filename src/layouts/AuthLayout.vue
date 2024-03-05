<script setup>
    import PrincipalSlotLayout from './PrincipalSlotLayout.vue';
    import Spinner from '@/components/UI/Spinner.vue';
    import { useAuthStore } from '@/stores/auth';

    const authStore = useAuthStore();
</script>

<template>
    <PrincipalSlotLayout>
        <template v-slot:contenido>
            <Spinner v-if="authStore.cargando" />

            <div v-else class="bg-white mt-20 p-6 shadow-lg max-w-3xl mx-auto">
                <RouterView />
            </div>
        </template>
    </PrincipalSlotLayout>
</template>