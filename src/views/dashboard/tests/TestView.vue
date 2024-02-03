<script setup>
    import { RouterLink } from 'vue-router';
    import useTest from '@/composables/tests/useTest';
    import Spinner from '@/components/UI/Spinner.vue';
    import HeadingDashboard from '@/components/dashboard/HeadingDashboard.vue';
    import VersionTest from '@/components/tests/mostrar/VersionTest.vue';
    import { formatearVersion } from '@/helpers';

    const {
        cargando,
        test,
        page,
        editarPublico,
        editarRespuestas,
        handleClickEliminarTest,
        handleClickEliminarVersion,
        handleClickPage,
        canDeleteVersion,
    } = useTest();
</script>

<template>
    <Spinner v-if="cargando" />

    <div v-else>
        <HeadingDashboard>Administrar Test</HeadingDashboard>

        <div class="bg-white max-w-lg mt-10 shadow rounded p-4">
            <h2 class="text-lg font-black text-teal-800 mb-5">Versiones: </h2>
            
            <nav class="flex flex-col gap-2">
                <button 
                    v-for="versionTest in test.versiones" 
                    @click="handleClickPage(versionTest.id)"
                    :key="versionTest.id"
                    :disabled="page === versionTest.id"
                    :class="[page === versionTest.id ? 'bg-gray-100 text-teal-800' : 'bg-teal-800 hover:bg-teal-900 text-white flex-1']"
                    class="py-2 px-4 font-bold"
                >
                    {{ formatearVersion(versionTest.version) }}
                </button>
            </nav>
        </div>
    
        <div class="bg-white shadow rounded mx-auto mt-10 space-y-4 px-4 py-6">

            <VersionTest
                v-for="versionTest in test.versiones"
                :key="versionTest.id"
                :version-test="versionTest"
                :page="page"
                :can-delete-version="canDeleteVersion"
                @editar-publico="editarPublico"
                @editar-respuestas="editarRespuestas"
                @handle-click-eliminar-version="handleClickEliminarVersion"
            />

            <div class="p-2 bg-emerald-50">
                <h2 class="p-2 text-xl font-extrabold text-slate-700">Opciones Generales: </h2>
                
                <div class="py-4 space-y-6 divide-y-2 divide-emerald-300">
                    <div class="p-2">
                        <h3 class="font-bold text-teal-800">¿Deseas Actualizar El Test?</h3>
                        
                        <div>
                            <p class="py-4 px-2 text-slate-700 mb-6">Esta Opcion Tomara la Ultima Version del Test que Este Disponible y la Modificara Creando Una Nueva Version.</p>
                            
                            <RouterLink 
                                class=" bg-teal-800 hover:bg-teal-900 py-2 px-4 text-center text-white font-bold"
                                :to="{name: 'dashboard.tests.editar', params: {id: test.id}}"
                            >
                                Actualizar
                            </RouterLink>
                        </div>
                    </div>

                    <div class="p-2">
                        <h3 class="font-bold text-teal-800">¿Deseas Eliminar El Test?</h3>

                        <div>
                            <p class="py-4 px-2 text-slate-700 mb-6">Esta Opcion Eliminara el Test y sus Versiones Permanentemente.</p>
                            
                            <button 
                                @click="handleClickEliminarTest"
                                class=" bg-rose-800 hover:bg-rose-900 py-2 px-4 text-white font-bold"
                                type="button"
                            >
                                Eliminar
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>