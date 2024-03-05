<script setup>
    import Header from '@/components/header/Header.vue';
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
    <Header :submenu="false" />

    <main class="px-4 my-8 container mx-auto mt-24">

        <Bar />

        <Bubble />

        <Pie />

        <Doughnut />

        <Line />

        <PolarArea />

        <Radar />

        <Scatter />
    </main>
</template>