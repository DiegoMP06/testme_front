<script setup>
    import { Chart, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js';
    import { Bar } from 'vue-chartjs';

    Chart.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale);

    const data = {
        labels: [
            'January',
            'February',
            'March',
            'April',
            'May',
            'June',
            'July',
            'August',
            'September',
            'October',
            'November',
            'December'
        ],
        datasets: [
            {
                label: 'Data One',
                backgroundColor: '#f87979',
                data: [40, 20, 12, 39, 10, 40, 39, 80, 40, 20, 12, 11]
            }
        ]
    };

    const options = {
        responsive: true,
        mainAspectRatio: false,
    };
</script>

<template>
    <Bar 
        :data="data"
        :options="options"
    />
</template>