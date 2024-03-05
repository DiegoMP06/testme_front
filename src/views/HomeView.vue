<script setup>
    import PrincipalSlotLayout from '@/layouts/PrincipalSlotLayout.vue';
    import WorkingPage from '@/components/UI/WorkingPage.vue';
    import Bar from '@/components/graficas/Bar.vue';
    import Bubble from '@/components/graficas/Bubble.vue';
    import Pie from '@/components/graficas/Pie.vue';
    import Doughnut from '@/components/graficas/Doughnut.vue';
    import Line from '@/components/graficas/Line.vue';
    import PolarArea from '@/components/graficas/PolarArea.vue';
    import Radar from '@/components/graficas/Radar.vue';
    import Scatter from '@/components/graficas/Scatter.vue';
</script>

<template>
    <PrincipalSlotLayout>
        <template v-slot:contenido>
            <WorkingPage />
        </template>
    </PrincipalSlotLayout>

<!-- 
        <Bar />

        <Bubble />

        <Pie />

        <Doughnut />

        <Line />

        <PolarArea />

        <Radar />

        <Scatter /> -->

</template>