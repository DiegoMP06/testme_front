<script setup>
    import useAgregarProfesor from '@/composables/salas/useAgregarProfesor';
    import Spinner from '@/components/UI/Spinner.vue';
    import HeadingDashboard from '@/components/dashboard/HeadingDashboard.vue';
    import NavegacionSala from '@/components/salas/mostrar/NavegacionSala.vue';
    import BusquedaProfesores from '@/components/salas/mostrar/BusquedaProfesores.vue'
    import Paginacion from '@/components/UI/Paginacion.vue';
    import Profesor from '@/components/salas/mostrar/Profesor.vue';
    import SalaDashboardLayout from '@/layouts/SalaDashboardLayout.vue';

    const {
        cargando,
        links,
        meta,
        users,
        sala,
        busqueda,
        page,
        handleClickSolicitar,
        obtenerProfesores,
        hasUsers,
    } = useAgregarProfesor();
</script>

<template>
    <SalaDashboardLayout
        :sala="sala"
        :cargando="cargando"
        heading="Agregar Profesores"
    >
        <template v-slot:header>
            <BusquedaProfesores 
                :busqueda="busqueda"
                v-model:busqueda="busqueda"
                @obtener-profesores="obtenerProfesores"
            />
        </template>
        
        <template v-slot:contenido>
            <div class="p-2 grid gap-2 lg:grid-cols-2" v-if="hasUsers">
                <Profesor 
                    v-for="user in users"
                    :user="user"
                    @handle-click-solicitar="handleClickSolicitar"
                />
            </div>
    
            <p class="px-2 py-24 text-center font-bold" v-else>No hay Profesores.</p>
        </template>

        <template v-slot:footer>
            <Paginacion  
                :meta="meta"
                :links="links"
                :page="page"
                @obtener-datos="obtenerProfesores"
            />
        </template>
    </SalaDashboardLayout>
</template>