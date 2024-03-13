<script setup>
    import useSalas from '@/composables/salas/useSalas'
    import HeadingDashboard from '@/components/dashboard/HeadingDashboard.vue';
    import AccionesDashboard from '@/components/dashboard/AccionesDashboard.vue';
    import Paginacion from '@/components/UI/Paginacion.vue';
    import Spinner from '@/components/UI/Spinner.vue';
    import Sala from '@/components/salas/mostrar/Sala.vue';

    const {
        page,
        salas,
        links,
        meta,
        cargando,
        obtenerSalas,
        hasSalas,
    }  = useSalas();
</script>

<template>
    <HeadingDashboard>Mis Salas</HeadingDashboard>
    
    <Spinner v-if="cargando" />

    <div v-else>
        <AccionesDashboard :opciones="{name: 'dashboard.salas.crear'}">
            Crear Sala
        </AccionesDashboard>
    
        <div class="mt-10">
            <div v-if="hasSalas" class="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
                <Sala
                    v-for="sala in salas"
                    :key="sala.id"
                    :sala="sala"
                />
            </div>
        
            <p v-else class="text-center text-lg font-black text-slate-700">No tienes Salas</p>
        </div>
    
        <Paginacion 
            :meta="meta"
            :links="links"
            :page="page"
            @obtener-datos="obtenerSalas"
        />
    </div>

</template>