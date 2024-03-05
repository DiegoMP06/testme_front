<script setup>
    import useProfesoresSala from '@/composables/salas/useProfesoresSala';
    import Profesor from '@/components/salas/edu/Usuario.vue';
    import Spinner2 from '@/components/UI/Spinner2.vue';

    const {
        cargando,
        profesores,
        hasProfesores,
    } = useProfesoresSala();

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

            <div 
                class="grid xl:grid-cols-2 gap-2" 
                v-if="hasProfesores"
            >
                <Profesor 
                    v-for="profesor in profesores"
                    :usuario="profesor"
                />
            </div>

            <p v-else class="text-center font-bold py-32">No Hay Profesores</p>
        </div>

        <p v-else class="text-lg text-center font-bold py-32">Debes Unirte Para Ver Mas</p>
    </div>
</template>