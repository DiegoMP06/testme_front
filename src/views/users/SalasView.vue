<script setup>
    import Spinner from '@/components/UI/Spinner.vue';
    import useSalas from '@/composables/users/useSalas';
    import HeadingDashboard from '@/components/dashboard/HeadingDashboard.vue';
    import Sala from '@/components/users/Sala.vue';
    import Paginacion from '@/components/UI/Paginacion.vue';

    const {
        cargando,
        links,
        meta,
        page,
        salas,
        obtenerSalas,
        hasSalas,
    } = useSalas();
</script>

<template>
    <Spinner v-if="cargando" />

    <div v-else> 
        <HeadingDashboard>
            Mis Salas
        </HeadingDashboard>

        <div class="bg-white p-6 rounded shadow-lg mt-10 grid gap-4">
            <Sala 
                v-if="hasSalas"
                v-for="sala in salas"
                :sala="sala"
            />

            <p class="text-center my-20 font-bold" v-else>
                No Te Has Unido a Ninguna Sala
            </p>
        </div>

        <Paginacion 
            :page="page"
            :meta="meta"
            :links="links"
            @obtener-datos="obtenerSalas"
        />
    </div>
</template>