<script setup>
    import {useAuthStore} from '@/stores/auth';

    const authStore =  useAuthStore();

    defineProps([
        'mostrar'
    ]);
</script>

<template>
    <div class="flex hover:grayscale gap-4 items-center">
        <div class="rounded-full overflow-hidden">
            <img 
                class="w-8 h-8"
                src="/img/perfil.webp" 
                :alt="`Imagen de perfil de ${authStore.user.usuario}`" 
            />
        </div>

        <div :class="{'md:hidden': !mostrar}" class="flex-1">
            <p class="text-sm text-center font-black mb-1">
                {{ `${authStore.user.name} ${authStore.user.apellido_paterno} ${authStore.user.apellido_materno}` }}
            </p>

            <p class="text-xs text-center font-bold"> 
                {{ authStore.user.usuario }}
            </p>
        </div>
    </div>
</template>