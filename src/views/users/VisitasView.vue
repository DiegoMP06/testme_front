<script setup>
    import useVisitas from '@/composables/users/useVisitas';
    import Spinner from '@/components/UI/Spinner.vue';
    import Paginacion from '@/components/UI/Paginacion.vue';
    import Visita from '@/components/users/Visita.vue';
    import HeadingDashboard from '@/components/dashboard/HeadingDashboard.vue';

    const {
        cargando,
        visitas,
        linksVisitas,
        metaVisitas,
        pageVisitas,
        obtenerVisitas,
        visitasSalas,
        linksVisitasSalas,
        metaVisitasSalas,
        pageVisitasSalas,
        obtenerVisitasSalas,
        hasVisitas,
        hasVisitasSalas,
    } = useVisitas();
</script>

<template>
    <Spinner v-if="cargando" />

    <div v-else>
        <HeadingDashboard>
            Tests Respondidos
        </HeadingDashboard>

        <div class="bg-white p-6 rounded shadow-lg mt-10">
            <h2 class="text-xl font-extrabold text-teal-800">Historial de Visitas</h2>

            <div class="grid gap-4 my-6" v-if="hasVisitas">
                <Visita 
                    v-for="visita in visitas"
                    :visita="visita"
                />
            </div>

            <p class="font-bold text-lg text-center my-20" v-else>No Has Contestado Ningun Test.</p>

            <Paginacion 
                :meta="metaVisitas"
                :links="linksVisitas"
                :page="pageVisitas"
                @obtener-datos="obtenerVisitas"
            />
        </div>

        <div class="bg-white p-6 rounded shadow-lg mt-10">
            <h2 class="text-xl font-extrabold text-teal-800">Historial de Visitas a Tests de Salas</h2>

            <div class="grid gap-4 my-6" v-if="hasVisitasSalas">
                <Visita 
                    v-for="visita in visitasSalas"
                    :visita="visita"
                    :sala="true"
                />
            </div>

            <p class="font-bold text-lg text-center my-20" v-else>No Has Contestado Ningun Test.</p>

            <Paginacion 
                :meta="metaVisitasSalas"
                :links="linksVisitasSalas"
                :page="pageVisitasSalas"
                @obtener-datos="obtenerVisitasSalas"
            />
        </div>
    </div>
</template>