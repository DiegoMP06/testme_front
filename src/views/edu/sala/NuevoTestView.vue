<script setup>
    import Spinner2 from '@/components/UI/Spinner2.vue';
    import TestProfesor from '@/components/salas/edu/TestsProfesor.vue';
    import useAgregarTest from '@/composables/salas/useAgregarTest';
    import Paginacion from '@/components/UI/Paginacion.vue';

    const {
        cargando,
        tests,
        meta,
        links,
        page,
        obtenerTests,
        handleClickEnlazar,
        handleClickDesenlazar,
        hasTests,
    } = useAgregarTest();

    defineProps({
        isEnlazado: {
            required: true,
        },
        isCreador: {
            required: true,
        },
        sala: {
            type: Object,
            required: true,
        },
        isTeacher: {
            required: true,
        }
    });
</script>

<template>
    <div class="relative w-full min-h-96 lg:min-h-full" v-if="cargando">
        <Spinner2 />
    </div>

    <div v-else>
        <div 
            class="grid xl:grid-cols-2 gap-2"
            v-if="hasTests"
        >
            <TestProfesor
                v-for="test in tests"
                :test="test"
                @handle-click-enlazar="handleClickEnlazar"
                @handle-click-desenlazar="handleClickDesenlazar"
            />
        </div>

        <p v-else class="text-center font-bold py-32">No Hay Tests</p>

        <Paginacion 
            :meta="meta"
            :links="links"
            :page="page"
            @obtener-datos="obtenerTests"
        />
    </div>
</template>