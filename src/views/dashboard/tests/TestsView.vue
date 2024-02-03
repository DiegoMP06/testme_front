<script setup>
    import useTests from '@/composables/tests/useTests';
    import HeadingDashboard from '@/components/dashboard/HeadingDashboard.vue';
    import AccionesDashboard from '@/components/dashboard/AccionesDashboard.vue';
    import Test from '@/components/tests/mostrar/Test.vue';
    import Paginacion from '@/components/UI/Paginacion.vue';
    import Spinner from '@/components/UI/Spinner.vue';

    const {
        page,
        tests,
        meta,
        links,
        cargando,
        obtenerTests,
        editarPublico,
        hasTests,
    } = useTests();
</script>

<template>
    <HeadingDashboard>Mis Tests</HeadingDashboard>
    
    <Spinner v-if="cargando" />

    <div v-else>
        <AccionesDashboard :opciones="{name: 'dashboard.tests.crear'}">
            Crear Test
        </AccionesDashboard>
    
        <div class="mt-10">
            <div v-if="hasTests" class="grid gap-6 xl:grid-cols-2">
                <Test
                    v-for="test in tests"
                    :key="test.id"
                    :test="test"
                    @editar-publico="editarPublico"
                />
            </div>
        
            <p v-else class="text-center text-lg font-black text-slate-700">No tienes Tests</p>
        </div>
    
        <Paginacion 
            :meta="meta"
            :links="links"
            :page="page"
            @obtener-datos="obtenerTests"
        />
    </div>
</template>