<script setup>
    import PrincipalSlotLayout from '@/layouts/PrincipalSlotLayout.vue';
</script>

<template>
    <PrincipalSlotLayout>
        <template v-slot:contenido>
            <div class="pt-10 flex flex-col md:flex-row gap-6 items-center justify-evenly">
                <div class="text-white p-6 bg-rose-800 rounded-lg">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-20 h-20">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M18.364 18.364A9 9 0 0 0 5.636 5.636m12.728 12.728A9 9 0 0 1 5.636 5.636m12.728 12.728L5.636 5.636" />
                    </svg>
                </div>

                <p class="text-8xl font-extrabold text-slate-700 text-center">
                    404
                    <span class="text-2xl">
                        Pagina No Encontrada
                    </span>
                </p>
            </div>
        </template>
    </PrincipalSlotLayout>
</template>