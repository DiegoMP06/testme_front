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
        'handle-click-actualizar-nombre',
        'handle-click-actualizar-descripcion',
        'handle-click-actualizar-categoria',
        'handle-click-actualizar-publico',
        'handle-click-actualizar-respuestas',
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
            <div class="p-2 mb-6 flex gap-4 items-center">
                <h3 class="text-2xl font-black text-slate-700 truncate flex-1">
                    {{ versionTest.nombre }}
                </h3>

                <button 
                    @click="$emit('handle-click-actualizar-nombre', versionTest.id)"
                    class="p-1 transition-colors rounded text-slate-700 hover:bg-slate-100 border-2 shadow border-slate-300"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
                        <path stroke-linecap="round" stroke-linejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125" />
                    </svg>
                </button>
            </div>

            <div class="py-2 divide-y-2 md:divide-y-0 md:divide-x-2 divide-slate-300 md:flex gap-4">
                <div class="flex-1 p-2">
                    <div class="flex gap-4 items-center">
                        <p class="text-xl font-black text-teal-800 flex-1 truncate grid  md:block">
                            Categoria: 
                            <span class="font-semibold text-slate-700">
                                {{ versionTest.categoria?.categoria }}
                            </span>
                        </p>

                        <button 
                            @click="$emit('handle-click-actualizar-categoria', versionTest.id)"
                            class="p-1 transition-colors rounded text-slate-700 hover:bg-slate-100 border-2 shadow border-slate-300"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
                                <path stroke-linecap="round" stroke-linejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125" />
                            </svg>
                        </button>
                    </div>
    
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
                <div class="flex gap-4 items-center">
                    <h3 class="text-xl font-black text-teal-800 flex-1">Descripcion: </h3>

                    <button 
                        @click="$emit('handle-click-actualizar-descripcion', versionTest.id)"
                        class="p-1 transition-colors rounded text-slate-700 hover:bg-slate-100 border-2 shadow border-slate-300"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
                            <path stroke-linecap="round" stroke-linejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125" />
                        </svg>
                    </button>
                </div>

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
            @handle-click-actualizar-publico="$emit('handle-click-actualizar-publico', $event)"
            @handle-click-actualizar-respuestas="$emit('handle-click-actualizar-respuestas', $event)"
            @handle-click-eliminar-version="$emit('handle-click-eliminar-version', $event)"
        />
    </div>
</template>
