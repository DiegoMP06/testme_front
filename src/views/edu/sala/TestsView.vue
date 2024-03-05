<script setup>
    import Spinner2 from '@/components/UI/Spinner2.vue';
    import Test from '@/components/salas/edu/Test.vue';
    import useTestsSala from '@/composables/salas/useTestsSala';

    const {
        cargando,
        tests,
        testsPublicos,
        testsUser,
        testsCerrados,
        hasTests,
        hasTestsUser,
        hasTestsPublicos,
        hasTestsCerrados,
    } = useTestsSala();

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
                v-if="hasTestsPublicos"
                class="grid xl:grid-cols-2 gap-2 my-4"
            >
                <Test
                    v-for="test in testsPublicos"
                    :test="test"
                    :sala-id="sala.id"
                    :publicos="true"
                />
            </div>

            <p v-else class="text-center font-bold py-32">No Hay Tests</p>
        </div>

        <p v-else class="text-lg text-center font-bold py-32">Debes Unirte Para Ver Mas</p>

        <div v-if="isTeacher || isCreador" class="bg-emerald-50 p-2 divide-y-2 divide-emerald-200">
            <div class="p-2">
                <h3 class="text-lg font-extrabold text-teal-800">Tus Tests</h3>

                <div 
                    v-if="hasTestsUser"
                    class="grid xl:grid-cols-2 gap-2 my-4"
                >
                    <Test
                        v-for="test in testsUser"
                        :test="test"
                        :user="true"
                    />
                </div>

                <p v-else class="text-center my-8 text-slate-700 font-bold">No Tienes Tests Elazados en Esta Sala.</p>

                <RouterLink class="bg-teal-800 hover:bg-teal-900 text-white font-bold px-4 py-2 inline-flex gap-1 items-center" :to="{name: 'edu.sala.tests.add', params: {id: sala.id}}">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                    </svg>
                    
                    Agregar
                </RouterLink>
            </div>

            <div class="p-2">
                <h3 class="text-lg font-extrabold text-teal-800">Tests Cerrados</h3>

                <div 
                    v-if="hasTestsCerrados"
                    class="grid xl:grid-cols-2 gap-2 my-4"
                >
                    <Test
                        v-for="test in testsCerrados"
                        :test="test"
                        :cerrados="true"
                    />
                </div>

                <p v-else class="text-center my-8 text-slate-700 font-bold">No Hay Tests Cerrados en Esta Sala.</p>
            </div>
        </div>
    </div>
</template>