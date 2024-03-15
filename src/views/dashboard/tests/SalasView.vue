<script setup>
    import useSalasTest from '@/composables/tests/useSalasTest';
    import Spinner from '@/components/UI/Spinner.vue';
    import Paginacion from '@/components/UI/Paginacion.vue';
    import HeadingDashboard from '@/components/dashboard/HeadingDashboard.vue';
    import TestSala from '@/components/tests/mostrar/TestSala.vue';

    const {
        cargando,
        test,
        links,
        meta,
        salas,
        page,
        version,
        obtenerTestSalas,
        hasSalas,
    } = useSalasTest();
</script>

<template>
    <Spinner v-if="cargando" />

    <div v-else>
        <HeadingDashboard>
            Ver Salas Enlazadas
        </HeadingDashboard>

        <div class="bg-white shadow rounded mt-10 space-y-4 p-4 max-w-4xl mx-auto divide-y-2 divide-slate-300">
            <h2 class="text-2xl font-black text-slate-700 truncate flex-1 p-2">
                {{ version.nombre }}
            </h2>

            <div class="pt-6 grid lg:grid-cols-2 gap-6" v-if="hasSalas">
                <TestSala 
                    v-for="sala in salas"
                    :sala="sala"
                    :test-id="test.id"
                    :version-id="version.id"
                />
            </div>

            <p class="py-20 text-center font-bold text-slate-700" v-else>
                No Esta Enlazada a una Sala
            </p>
        </div>

        <Paginacion 
            :page="page"
            :links="links"
            :meta="meta"
            @obtener-datos="obtenerTestSalas"
        />
    </div>
</template>