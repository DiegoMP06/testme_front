<script setup> 
    import useBusquedaHome from '@/composables/useBusquedaHome';
    import Paginacion from '@/components/UI/Paginacion.vue';
    import TestHome from '@/components/tests/mostrar/TestHome.vue';
    import Spinner from '@/components/UI/Spinner.vue';
    import PrincipalSlotLayout from '@/layouts/PrincipalSlotLayout.vue';

    const {
        cargando,
        meta,
        links,
        page,
        categorias,
        tipos,
        busquedaTests,
        buscarTests,
        handleClickBuscar,
        tests,
        hasTests,
    } = useBusquedaHome();
</script>

<template>
    <PrincipalSlotLayout 
        :submenu="true"
    >
        <template v-slot:submenu>
            <div class="px-4 md:px-0 container mx-auto">
                <form class="flex md:items-center flex-col md:flex-row gap-6" @submit.prevent="handleClickBuscar">
                    <div class="flex-1 flex flex-col lg:flex-row max gap-4">
                        <input 
                            type="search" 
                            name="busqueda" 
                            id="busqueda"
                            placeholder="Buscar"
                            class="p-2 outline-none flex-1 rounded"
                            v-model="busquedaTests.busqueda"
                        />

                        <div class="flex-1 flex flex-col md:flex-row gap-4">
                            <select 
                                name="categoria_id" 
                                id="categoria_id" 
                                class="p-2 flex-1 overflow-hidden"
                                v-model="busquedaTests.categoria_id"
                            >
                                <option value="">-- Seleccione una Categoria --</option>
                                <option v-for="categoria in categorias" :value="categoria.id">
                                    {{ categoria.categoria }}
                                </option>
                            </select>
    
                            <select 
                                name="tipo_id" 
                                id="tipo_id"  
                                class="p-2 flex-1 overflow-hidden"
                                v-model="busquedaTests.tipo_id"
                            >
                                <option value="">-- Seleccione un Tipo de Test --</option>
                                <option v-for="tipo in tipos" :value="tipo.id">
                                    {{ tipo.tipo }}
                                </option>
                            </select>
                        </div>
                    </div>
                    
                    <button type="submit" 
                        class="text-white hover:bg-teal-800 p-2 rounded-full transition-colors self-end md:self-auto"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                            <path stroke-linecap="round" stroke-linejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                        </svg>
                    </button>
                </form>
            </div>
        </template>

        <template v-slot:contenido>
            <div class="pt-16 md:pt-28 lg:pt-14">
                <Spinner 
                    v-if="cargando"
                />
             
                <div v-else>
                    <div v-if="hasTests" class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                        <TestHome 
                            v-for="test in tests"
                            :key="test.id"
                            :test="test"
                        />
        
                    </div>
        
                    <p v-else class="text-center text-lg font-extrabold">No Hay Tests</p>
            
                    <Paginacion 
                        :meta="meta"
                        :links="links"
                        :page="page"
                        @obtener-datos="buscarTests"
                    />
                </div>
            </div>
        </template>
    </PrincipalSlotLayout>
</template>