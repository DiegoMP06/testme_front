<script setup>
    import { Chart, ArcElement, Tooltip, Legend } from 'chart.js';
    import { Doughnut } from 'vue-chartjs';

    Chart.register(ArcElement, Tooltip, Legend);

    const data = {
        labels: ['VueJs', 'EmberJs', 'ReactJs', 'AngularJs'],
        datasets: [
            {
                backgroundColor: ['#41B883', '#E46651', '#00D8FF', '#DD1B16'],
                data: [40, 20, 80, 10]
            }
        ]
    };

    const options = {
        responsive: true,
        mainAspectRatio: false,
    };
</script>

<template>
    <Doughnut 
        :data="data"
        :options="options"
    />
</template>