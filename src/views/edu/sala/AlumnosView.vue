<script setup>
    import useAlumnosSala from '@/composables/salas/useAlumnosSala';
    import Alumno from '@/components/salas/edu/Usuario.vue';
    import Spinner2 from '@/components/UI/Spinner2.vue';

    const {
        cargando,
        alumnos,
        hasAlumnos,
    } = useAlumnosSala();

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
            v-if="isEnlazado || isCreador"
        >
            <div class="grid xl:grid-cols-2 gap-2" v-if="hasAlumnos">
                <Alumno 
                    v-for="alumno in alumnos"
                    :usuario="alumno"
                />
            </div>

            <p v-else class="text-center font-bold py-32">No Hay Alumnos</p>
        </div>

        <p v-else class="text-lg text-center font-bold py-32">Debes Unirte Para Ver Mas</p>
    </div>
</template>