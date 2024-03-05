<script setup>
    import useUsuariosSala from '@/composables/salas/useUsuariosSala'
    import Usuario from '@/components/salas/mostrar/Usuario.vue';
    import SalaDashboardLayout from '@/layouts/SalaDashboardLayout.vue';

    const {
        sala,
        alumnos,
        cargando,
        handleClickDesvincular,
        hasAlumnos,
    } = useUsuariosSala();
</script>

<template>
    <SalaDashboardLayout
        heading="Administrar Alumnos"
        :sala="sala"
        :cargando="cargando"
    >
        <template v-slot:contenido>
            <div class="p-2 grid gap-2 lg:grid-cols-2" v-if="hasAlumnos">
                <Usuario  
                    v-for="alumno in alumnos"
                    :usuario="alumno"
                    @handle-click-desvincular="handleClickDesvincular"
                />
            </div>
    
            <p class="px-2 py-24 text-center font-bold" v-else>No Hay Alumnos en Esta Sala.</p>
        </template>
    </SalaDashboardLayout>
</template>