<script setup>
    import Instruccion from '@/components/tests/instrucciones/mostrar/Instruccion.vue';
    import CampoGeneral from '@/components/tests/preguntas/mostrar/CampoGeneral.vue';
    import ListadoCampos from '@/components/tests/campos/mostrar/ListadoCampos.vue';
    import OpcionesVersionTest from './OpcionesVersionTest.vue';
    import {formatearFecha} from '@/helpers'
    import { computed } from 'vue';

    const props = defineProps({
        versionTest: {
            type: Object,
            required: true,
        },
        page: {
            type: [null, Number],
            required: true,
        },
        canDeleteVersion: {
            required: true,
        },
    });

    const emits = defineEmits([
        'editar-publico',
        'editar-respuestas',
        'handle-click-eliminar-version',
    ]);

    const isExamen = computed(() => {
        return props.versionTest.tipo_id === 4;
    });
    
    const isMultiple = computed(() => {
        return props.versionTest.tipo_id === 4 || props.versionTest.tipo_id === 3;
    });

    const isPublico = computed(() => {
        return props.versionTest.publico;
    });

    const hasCampos = computed(() => {
        return props.versionTest.campos.length > 0;
    });

    const hasRespuestas = computed(() => {
        return props.versionTest.respuestas;
    });

    const isPage = computed(() => {
        return props.page === props.versionTest.id;
    });
</script>

<template>
    <div v-if="isPage">
        <div class="divide-y-2 divide-slate-300">
            <h3 class="p-2 text-2xl font-black mb-6 text-slate-700 truncate">
                {{ versionTest.nombre }}
            </h3>

            <div class="py-2 divide-y-2 md:divide-y-0 md:divide-x-2 divide-slate-300 md:flex gap-4">
                <div class="flex-1 p-2">
                    <p class="text-xl font-black text-teal-800">
                        Categoria: 
                        <span class="font-semibold text-slate-700">
                            {{ versionTest.categoria?.categoria }}
                        </span>
                    </p>
    
                    <div class="flex flex-col items-end md:flex-row md:items-center my-6 gap-6">
                        <blockquote class="md:flex-1 text-slate-700">
                            {{ versionTest.categoria?.descripcion }}
                        </blockquote>
    
                        <img 
                            :src="`/img/${versionTest.categoria?.imagen}`" 
                            :alt="`Icono de le Categoria de ${versionTest.categoria?.categoria}`" 
                            class="max-w-20 max-h-20"
                        />
                    </div>
                </div>

                <div class="flex-1 p-2">
                    <p class="text-xl font-black text-teal-800">
                        Tipo de Test: 
                        <span class="font-semibold text-slate-700">
                            {{ versionTest.tipo?.tipo }}
                        </span>
                    </p>
    
                    <blockquote class="my-6 text-slate-700">
                        {{ versionTest.tipo?.descripcion }}
                    </blockquote>
                </div>
            </div>

            <div class="p-2">
                <h3 class="text-xl font-black text-teal-800">Descripcion: </h3>

                <blockquote class="my-6 text-slate-700">
                    {{ versionTest.descripcion }}
                </blockquote>
            </div>
        </div>

        <div class="lg:flex divide-y-2 lg:divide-x-2 lg:divide-y-0 divide-slate-300 gap-4">
            <div class="lg:w-3/5 divide-y-2 divide-slate-300">
                <div class="p-2">
                    <h3 class="text-xl font-black text-teal-800">Instrucciones: </h3>

                    <div class="grid gap-4 mt-6 divide-y-2 divide-slate-300">
                        <Instruccion 
                            v-for="instruccion in versionTest.instrucciones"
                            :key="instruccion.id"
                            :instruccion="instruccion"
                        />
                    </div>
                </div>
            </div>

            <div class="lg:w-2/5 divide-y-2 divide-slate-300 lg:pl-2">
                <div v-if="hasCampos" class="p-2">
                    <h3 class="text-xl font-black text-teal-800">Campos Extra: </h3>

                    <div class="divide-y-2 divide-slate-300">
                        <ListadoCampos 
                            v-for="campo in versionTest.camposExtra"
                            :key="campo.id"
                            :campo="campo"
                        />
                    </div> 
                </div>

                <div class="p-2">
                    <h3 class="text-xl font-black text-teal-800">Campos: </h3>

                    <div class="divide-y-2 divide-slate-300">
                        <CampoGeneral
                            v-for="campo in versionTest.campos"
                            :key="campo.id"
                            :campo="campo"
                            :is-examen="isExamen"
                            :is-multiple="isMultiple"
                        />
                    </div>
                </div>
            </div>
        </div>

        <OpcionesVersionTest 
            :version-test-id="versionTest.id"
            :has-respuestas="hasRespuestas"
            :is-examen="isExamen"
            :is-publico="isPublico"
            :can-delete-version="canDeleteVersion"
            @editar-publico="$emit('editar-publico', $event)"
            @editar-respuestas="$emit('editar-respuestas', $event)"
            @handle-click-eliminar-version="$emit('handle-click-eliminar-version', $event)"
        />
    </div>
</template>
