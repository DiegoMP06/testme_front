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

            <div class="grid gap-4 my-6">
                <Visita 
                    v-for="visita in visitas"
                    :visita="visita"
                />
            </div>

            <Paginacion 
                :meta="metaVisitas"
                :links="linksVisitas"
                :page="pageVisitas"
                @obtener-datos="obtenerVisitas"
            />
        </div>
    </div>
</template>