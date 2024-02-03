<script setup>
    import {computed} from 'vue'
    import { RouterLink } from 'vue-router';

    const props =  defineProps({
        sala: {
            type: Object,
            required: true,
        }
    });

    const isPublico = computed(() => {
        return props.sala.publico;
    });
</script>

<template>
    <div class="bg-white p-4 shadow rounded flex flex-col gap-2">
        <div class="flex justify-between">
            <RouterLink 
                :to="{name: 'edu.sala', params: {id: sala.id}}" 
                class="text-lg font-bold text-slate-700"
            >
                {{ sala.nombre }}
            </RouterLink>
    
            <p class="text-sm font-semibold" :class="[isPublico ? 'text-teal-700' : 'text-rose-700']">
                {{ isPublico ? 'Publico' : 'Privado' }}
            </p>
        </div>

        <RouterLink 
            :to="{name: ''}" 
            class="text-sm font-normal text-slate-600 flex gap-2"
        >
            <img 
                class="w-10 h-10 rounded-full"
                :src="sala.user?.imagen ?? '/img/perfil.webp'" 
                :alt="`imagen de perfil ${sala.user.usuario}`"
            />

            <span class="flex flex-col">
                {{ `${sala.user?.name} ${sala.user?.apellido_paterno} ${sala.user?.apellido_materno}` }}

                <span class="text-xs font-black">
                    {{ sala.user?.usuario }}
                </span>
            </span>
        </RouterLink>
    </div>
</template>