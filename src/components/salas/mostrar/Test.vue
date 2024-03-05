<script setup>
    const props = defineProps({
        test: {
            type: Object,
            required: true,
        },
    })

    defineEmits([
        'handle-click-desenlazar',
    ]);
</script>

<template>
    <div class="flex gap-4 items-center bg-slate-100 hover:bg-slate-200 transition-colors p-2 rounded">
        <div class="flex-1 flex flex-col gap-2">

            <div class="grid">
                <p class="text-teal-800 font-bold text-lg truncate">
                    {{ test.nombre }}
                </p>
            </div>
    
            <RouterLink class="flex gap-2" :to="{}">
                <img src="/img/perfil.webp" :alt="`Imagen de Perfil de ${test.user.usuario}`" class="w-10 h-10 rounded-full">
                
                <div class="flex flex-col justify-center">
                    <p class="text-sm">
                        {{ `${test.user.name} ${test.user.apellido_paterno} ${test.user.apellido_materno}` }}
                    </p>
    
                    <p class="text-xs font-bold">
                        {{ test.user.usuario }}
                    </p>
                </div>
            </RouterLink>
        </div>

        <button 
            type="button" 
            @click="$emit('handle-click-desenlazar', test.pivot.id)"
            class="p-2 bg-rose-800 hover:bg-rose-900 transition-colors rounded text-white"
        >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4">
                <path stroke-linecap="round" stroke-linejoin="round" d="M5 12h14" />
            </svg>          
        </button>
    </div>
</template>