<script setup>
    import { RouterLink } from 'vue-router';
    import { useModalStore } from '@/stores/modal';
    import useVersion from '@/composables/tests/useVersion';
    import Spinner from '@/components/UI/Spinner.vue';
    import HeadingDashboard from '@/components/dashboard/HeadingDashboard.vue';
    import { formatearVersion } from '@/helpers';
    import ModalDashboard from '@/components/UI/ModalDashboard.vue';
    import EditarNombre from '@/components/tests/editar/EditarNombre.vue';
    import EditarDescripcion from '@/components/tests/editar/EditarDescripcion.vue';
    import EditarCategoria from '@/components/tests/editar/EditarCategoria.vue';
    import OpcionesVersionTest from '@/components/tests/mostrar/OpcionesVersionTest.vue';
    import ListadoCampos from '@/components/tests/campos/mostrar/ListadoCampos.vue';
    import CampoGeneral from '@/components/tests/preguntas/mostrar/CampoGeneral.vue';
    import Instruccion from '@/components/tests/instrucciones/mostrar/Instruccion.vue';

    const modalStore =  useModalStore();

    const {
        cargando,
        subCargando,
        test,
        version,
        nombre,
        descripcion,
        categoria,
        selectsCategorias,
        quitarModal,
        handleSubmitNombre,
        handleClickActualizarNombre,
        handleSubmitDescripcion,
        handleClickActualizarDescripcion,
        handleSubmitCategoria,
        handleClickActualizarCategoria,
        handleClickActualizarPublico,
        handleClickActualizarRespuestas,
        handleClickEliminarVersion,
        canDeleteVersion,
        hasCampos,
        hasRespuestas,
        isMultiple,
        isExamen,
        isPublico,
    } = useVersion();
</script>

<template>
    <Spinner v-if="cargando" />

    <div v-else>
        <HeadingDashboard>Administrar Version de Test</HeadingDashboard>
    
        <div class="bg-white shadow rounded mt-10 space-y-4 px-4 py-6">
            <div class="divide-y-2 divide-slate-300">
                <div class="p-2 mb-6 flex gap-4 items-center">
                    <h3 class="text-2xl font-black text-slate-700 truncate flex-1">
                        {{ version.nombre }}
                    </h3>
    
                    <button 
                        @click="handleClickActualizarNombre"
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
                                    {{ version.categoria?.categoria }}
                                </span>
                            </p>
    
                            <button 
                                @click="handleClickActualizarCategoria"
                                class="p-1 transition-colors rounded text-slate-700 hover:bg-slate-100 border-2 shadow border-slate-300"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125" />
                                </svg>
                            </button>
                        </div>
        
                        <div class="flex flex-col items-end md:flex-row md:items-center my-6 gap-6">
                            <blockquote class="md:flex-1 text-slate-700">
                                {{ version.categoria?.descripcion }}
                            </blockquote>
        
                            <img 
                                :src="`/img/${version.categoria?.imagen}`" 
                                :alt="`Icono de le Categoria de ${version.categoria?.categoria}`" 
                                class="max-w-20 max-h-20"
                            />
                        </div>
                    </div>
    
                    <div class="flex-1 p-2">
                        <p class="text-xl font-black text-teal-800">
                            Tipo de Test: 
                            <span class="font-semibold text-slate-700">
                                {{ version.tipo?.tipo }}
                            </span>
                        </p>
        
                        <blockquote class="my-6 text-slate-700">
                            {{ version.tipo?.descripcion }}
                        </blockquote>
                    </div>
                </div>
    
                <div class="p-2">
                    <div class="flex gap-4 items-center">
                        <h3 class="text-xl font-black text-teal-800 flex-1">Descripcion: </h3>
    
                        <button 
                            @click="handleClickActualizarDescripcion"
                            class="p-1 transition-colors rounded text-slate-700 hover:bg-slate-100 border-2 shadow border-slate-300"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
                                <path stroke-linecap="round" stroke-linejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125" />
                            </svg>
                        </button>
                    </div>
    
                    <blockquote class="my-6 text-slate-700">
                        {{ version.descripcion }}
                    </blockquote>
                </div>
            </div>
    
            <div class="lg:flex divide-y-2 lg:divide-x-2 lg:divide-y-0 divide-slate-300 gap-4">
                <div class="lg:w-3/5 divide-y-2 divide-slate-300">
                    <div class="p-2">
                        <h3 class="text-xl font-black text-teal-800">Instrucciones: </h3>
    
                        <div class="grid gap-4 mt-6 divide-y-2 divide-slate-300">
                            <Instruccion 
                                v-for="instruccion in version.instrucciones"
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
                                v-for="campo in version.camposExtra"
                                :key="campo.id"
                                :campo="campo"
                            />
                        </div> 
                    </div>
    
                    <div class="p-2">
                        <h3 class="text-xl font-black text-teal-800">Campos: </h3>
    
                        <div class="divide-y-2 divide-slate-300">
                            <CampoGeneral
                                v-for="campo in version.campos"
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
                :version-id="version.id"
                :test-id="test.id"
                :has-respuestas="hasRespuestas"
                :is-examen="isExamen"
                :is-publico="isPublico"
                :can-delete-version="canDeleteVersion"
                @handle-click-actualizar-publico="handleClickActualizarPublico"
                @handle-click-actualizar-respuestas="handleClickActualizarRespuestas"
                @handle-click-eliminar-version="handleClickEliminarVersion"
            />
        </div>
    </div>

    <ModalDashboard 
        v-if="modalStore.isModal"
        :sub-cargando="subCargando"
        @quitar-modal="quitarModal"
    >
        <EditarNombre 
            v-if="modalStore.hasModal === 3.1"
            v-model:nombre="nombre"
            :version="version"
            @handle-submit-nombre="handleSubmitNombre"
        />
        
        <EditarDescripcion 
            v-else-if="modalStore.hasModal === 3.2"
            v-model:descripcion="descripcion"
            :version="version"
            @handle-submit-descripcion="handleSubmitDescripcion"
        />

        <EditarCategoria 
            v-else
            v-model:categoria="categoria"
            :selects-categorias="selectsCategorias"
            :version="version"
            @handle-submit-categoria="handleSubmitCategoria"
        />
    </ModalDashboard>
</template>