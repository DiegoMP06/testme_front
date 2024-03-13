<script setup>
    import { reactive, onMounted, ref, computed } from 'vue';
    import { Chart, ArcElement, Tooltip, Legend } from 'chart.js';
    import { Pie } from 'vue-chartjs';

    Chart.register(ArcElement, Tooltip, Legend);

    const options = {
        responsive: true,
        mainAspectRatio: false,
    };

    const props = defineProps({
        // [{label: 'nueve', value: 34}]
        datos: {
            type: Array,
            required: true,
        },
    });

    const data = computed(() => {
        const colores = ['#ccfbf1', '#99f6e4', '#5eead4', '#2dd4bf', '#14b8a6', '#0d9488', '#0f766e', '#115e59', '#134e4a',];
        let j = 0;

        return {
            labels: props.datos.map(({label}) => label),
            datasets: [
                {
                    backgroundColor: props.datos.map((data, i) => {
                        j = j > (colores.length - 1) ? 0 : j;
                        
                        return colores[j++];
                    }),
                    data: props.datos.map(({value}) => value),
                },
            ]
        }
    });
</script>

<template>
    <Pie
        :data="data"
        :options="options"
    />
</template>