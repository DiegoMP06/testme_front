<script setup>
    import { RouterLink } from 'vue-router';
    import { FormKit } from '@formkit/vue';
    import CampoEdu from '@/components/tests/preguntas/edu/CampoEdu.vue';

    const props = defineProps({
        test: {
            type: Object,
            required: true,
        },
        isCreador: {
            type: Boolean,
            required: true
        }
    });

    const emits = defineEmits([
        'handle-click-submit'
    ]);
</script>

<template>
    <div class="flex items-center gap-4 flex-col md:flex-row justify-between p-2">
        <div class="flex gap-4 items-center">
            <img 
                class="max-w-14 max-h-14"
                :src="`/img/${test.categoria?.imagen}`"
                :alt="`Icono de la Categoria ${test.categoria?.categoria}`"
            />

            <p class="text-jg font-extrabold text-slate-700">
                Categoria: 
                <span class="font-semibold">
                    {{ test.categoria?.categoria }}
                </span>
            </p>
        </div>

        <p class="text-jg font-extrabold text-slate-700">
            Tipo: 
            <span class="font-semibold">
                {{ test.tipo?.tipo }}
            </span>
        </p>

        <RouterLink 
            :to="{name: ''}" 
            class="text-sm font-normal text-slate-600 flex gap-2"
        >
            <img 
                class="w-10 h-10 rounded-full"
                :src="test.user?.imagen ?? '/img/perfil.webp'" 
                :alt="`imagen de perfil ${test.user.usuario}`"
            />

            <span class="flex flex-col">
                {{ `${test.user?.name} ${test.user?.apellido_paterno} ${test.user?.apellido_materno}` }}

                <span class="text-xs font-black">
                    {{ test.user?.usuario }}
                </span>
            </span>
        </RouterLink>
    </div>

    <div class="p-2">
        <p class="text-teal-800 text-lg font-extrabold">
            Descripcion: 
        </p>

        <blockquote class="text-slate-700 my-6">
            {{ test.descripcion }}
        </blockquote>
    </div>

    <div class="p-2">
        <FormKit 
            type="form"
            submit-label="Enviar"
            incomplete-message="Revisa Los Mensajes de Error"
            @submit="$emit('handle-click-submit', $event)"
            :actions="!isCreador"
        >
            <CampoEdu
                v-for="campo in test.camposExtra"
                :key="campo.id"
                :campo="campo"
            />

            <CampoEdu
                v-for="campo in test.campos"
                :key="campo.id"
                :campo="campo"
            />
        </FormKit>
    </div>
</template>