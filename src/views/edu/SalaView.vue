<script setup>
    import useEduSala from '@/composables/salas/useEduSala';
    import Spinner from '@/components/UI/Spinner.vue';
    import HeadingDashboard from '@/components/dashboard/HeadingDashboard.vue';
    import SideBarSala from '@/components/salas/edu/SideBarSala.vue';

    const {
        cargando,
        sala,
    } = useEduSala();
</script>

<template>
    <Spinner v-if="cargando" />

    <div v-else>
        <HeadingDashboard>
            {{ sala.nombre }}
        </HeadingDashboard>

        <div class="mt-10 lg:flex">
            <div class="lg:w-1/3">
                <SideBarSala 
                    :sala="sala"
                />
            </div>

            <div class="flex-1 p-4 bg-white shadow rounded-b lg:rounded-bl-none lg:rounded-r">
            </div>
        </div>
    </div>
</template>