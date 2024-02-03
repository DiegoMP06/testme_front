<script setup> 
    import useBusquedaHome from '@/composables/useBusquedaHome';
    import Header from '@/components/header/Header.vue';
    import Paginacion from '@/components/UI/Paginacion.vue';
    import SalaHome from '@/components/salas/mostrar/SalaHome.vue';
    import Spinner from '@/components/UI/Spinner.vue';
    import { enlaces } from '@/helpers';

    const {
        cargando,
        meta,
        links,
        page,
        busquedaSalas,
        buscarSalas,
        handleClickBuscar,
        salas,
        hasSalas,
    } = useBusquedaHome();
</script>

<template>
    <Header :enlaces="enlaces" :submenu="true">
        <template v-slot:submenu>
            <div class="px-4 md:px-0 container mx-auto">
                <form class="flex md:items-center flex-col md:flex-row gap-6 md:w-1/2" @submit.prevent="handleClickBuscar">
                    <div class="flex-1 flex">
                        <input 
                            type="search" 
                            name="busqueda" 
                            id="busqueda"
                            placeholder="Buscar"
                            class="p-2 outline-none flex-1 rounded"
                            v-model="busquedaSalas.busqueda"
                        />
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
    </Header>

    <main class="px-4 container mx-auto pt-44 md:pt-60 lg:pt-44 pb-8 min-h-screen">
        <Spinner 
            v-if="cargando"
        />

        <div v-else>
            <div v-if="hasSalas" class="grid md:grid-cols-2 xl:grid-cols-3 gap-4">
                <SalaHome 
                    v-for="sala in salas"
                    :key="sala.id"
                    :sala="sala"
                />
            </div>

            <p v-else class="text-center text-lg font-extrabold">No Hay Salas</p>
    
            <Paginacion 
                :meta="meta"
                :links="links"
                :page="page"
                @obtener-datos="buscarSalas"
            />
        </div>
    </main>
</template>