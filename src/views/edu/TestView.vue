<script setup>
    import useEduTest from '@/composables/tests/useEduTest';
    import HeadingDashboard from '@/components/dashboard/HeadingDashboard.vue';
    import Spinner from '@/components/UI/Spinner.vue';
    import PrimerPagina from '@/components/tests/edu/PrimerPagina.vue';
    import SegundaPagina from '@/components/tests/edu/SegundaPagina.vue';
    import { formatearVersion } from '@/helpers';

    const {
        page,
        cargando,
        handleClickSubmit,
        test,
        visita,
        isCreador,
        getInstruccion,
    } = useEduTest();

</script>

<template>
    <Spinner v-if="cargando" />

    <div v-else>
        <HeadingDashboard>{{ test.nombre }}</HeadingDashboard>

        <div class="bg-white shadow mt-10 max-w-4xl mx-auto">
            <p class="text-xs text-end pr-4 pt-2">
                {{ formatearVersion(test.version) }}
            </p>

            <div class="divide-y-2 divide-slate-300 space-y-4 px-4 pb-8 pt-4">
                <PrimerPagina 
                    v-if="page === 1"
                    :test="test"
                    :is-creador="isCreador"
                    @handle-click-submit="handleClickSubmit"
                />
    
                <SegundaPagina
                    v-else
                    :test="test"
                    :visita="visita"
                    :get-instruccion="getInstruccion"
                />
            </div>
        </div>
    </div>
</template>