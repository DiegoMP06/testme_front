<script setup>
    import { RouterLink } from 'vue-router';
    import useTest from '@/composables/tests/useTest';
    import Spinner from '@/components/UI/Spinner.vue';
    import HeadingDashboard from '@/components/dashboard/HeadingDashboard.vue';
    import { useRoute } from 'vue-router';
    import { formatearVersion } from '@/helpers';
    import Paginacion from '@/components/UI/Paginacion.vue';
    import VersionTest from '@/components/tests/mostrar/VersionTest.vue';

    const route = useRoute();

    const {
        cargando,
        versiones,
        meta,
        links,
        page,
        obtenerVersiones,
        handleClickEliminarTest,
    } = useTest();
</script>

<template>
    <Spinner v-if="cargando" />

    <div v-else>
        <HeadingDashboard>Administrar Test</HeadingDashboard>

        <div class="bg-white mt-10 shadow rounded p-4">
            <h2 class="text-xl font-black text-teal-800 mb-5">Versiones: </h2>
            
            <div class="grid lg:grid-cols-2 gap-4">
                <VersionTest 
                    v-for="version in versiones"
                    :version="version"
                />
            </div>
        </div>

        <Paginacion 
            :page="page"
            :meta="meta"
            :links="links"
            @obtener-datos="obtenerVersiones"
        />
    
        <div class="bg-white shadow rounded mx-auto mt-10 space-y-4 px-4 py-6">
            <div class="p-2 bg-emerald-50">
                <h2 class="p-2 text-xl font-extrabold text-slate-700">Opciones Generales: </h2>
                
                <div class="py-4 space-y-6 divide-y-2 divide-emerald-300">
                    <div class="p-2">
                        <h3 class="font-bold text-teal-800">¿Deseas Actualizar El Test?</h3>
                        
                        <div>
                            <p class="py-4 px-2 text-slate-700 mb-6">Esta Opcion Tomara la Ultima Version del Test que Este Disponible y la Modificara Creando Una Nueva Version.</p>
                            
                            <RouterLink 
                                class=" bg-teal-800 hover:bg-teal-900 py-2 px-4 text-center text-white font-bold"
                                :to="{name: 'dashboard.tests.editar', params: {id: route.params.id}}"
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