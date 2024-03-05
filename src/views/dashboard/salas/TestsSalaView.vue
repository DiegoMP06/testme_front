<script setup>
    import useTestsSalaAdmin from '@/composables/salas/useTestsSalaAdmin'
    import Test from '@/components/salas/mostrar/Test.vue';
    import SalaDashboardLayout from '@/layouts/SalaDashboardLayout.vue';
    
    const {
        cargando,
        sala,
        tests,
        handleClickDesenlazar,
        hasTests,
    } = useTestsSalaAdmin();
</script>

<template>
    <SalaDashboardLayout 
        heading="Administrar Tests"
        :cargando="cargando"
        :sala="sala"
    >
        <template v-slot:contenido>
            <div class="p-2 grid gap-2 lg:grid-cols-2" v-if="hasTests">
                <Test
                    v-for="test in tests"
                    :test="test"
                    @handle-click-desenlazar="handleClickDesenlazar"
                />
            </div>

            <p class="px-2 py-24 text-center font-bold" v-else>No Hay Tests en Esta Sala.</p>
        </template>
    </SalaDashboardLayout>
</template>