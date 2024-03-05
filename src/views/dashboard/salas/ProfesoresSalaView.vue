<script setup>
    import useUsuariosSala from '@/composables/salas/useUsuariosSala'
    import Usuario from '@/components/salas/mostrar/Usuario.vue';
    import { RouterLink } from 'vue-router';
    import SalaDashboardLayout from '@/layouts/SalaDashboardLayout.vue';

    const {
        sala,
        cargando,
        profesores,
        hasProfesores,
        handleClickDesvincular,
        canAddProfesor,
    } = useUsuariosSala();
</script>

<template>
    <SalaDashboardLayout
        heading="Administrar Profesores"
        :sala="sala"
        :cargando="cargando"
    >
        <template v-slot:contenido>
            <div class="p-2 grid gap-2 lg:grid-cols-2" v-if="hasProfesores">
                <Usuario  
                    v-for="profesor in profesores"
                    :usuario="profesor"
                    @handle-click-desvincular="handleClickDesvincular"
                />
            </div>
    
            <p class="px-2 py-24 text-center font-bold" v-else>No Hay Profesores en Esta Sala.</p>
        </template>

        <template v-slot:footer>
            <div class="fixed bottom-4 right-4" v-if="canAddProfesor">
                <RouterLink 
                    :to="{name: 'dashboard.salas.profesores.add', params: {id: sala.id}}"
                    type="button" 
                    class="p-2 bg-teal-800 text-white text-xs font-semibold rounded uppercase hover:bg-teal-900 transition-colors flex gap-1 items-center"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M18 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0ZM3 19.235v-.11a6.375 6.375 0 0 1 12.75 0v.109A12.318 12.318 0 0 1 9.374 21c-2.331 0-4.512-.645-6.374-1.766Z" />
                    </svg>
                    Agregar
                </RouterLink>
            </div>
        </template>
    </SalaDashboardLayout>
</template>