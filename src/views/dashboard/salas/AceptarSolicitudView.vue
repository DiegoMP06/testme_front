<script setup>
    import useAceptarSolicitud from '@/composables/salas/useAceptarSolicitud';
    import HeadingDashboard from '@/components/dashboard/HeadingDashboard.vue';
    import Spinner from '@/components/UI/Spinner.vue';

    const {
        cargando,
        sala,
        enlazarProfesor,
        canUnirse,
    } = useAceptarSolicitud()
</script>

<template>
    <Spinner v-if="cargando" />

    <div v-else>
        <HeadingDashboard>
            Aceptar Solicitud
        </HeadingDashboard>

        <div class="max-w-6xl mx-auto bg-white px-4 py-6 mt-10 shadow space-y-8">
            <div v-if="canUnirse">
                <p class="text-center text-lg font-bold text-slate-700 mb-4">
                    ¿Deseas Unirte a Como Profesor la Sala 
                    <span class="font-black">
                        {{ sala.nombre }}
                    </span>?
                </p>

                <div class="flex justify-center">
                    <button 
                        @click="enlazarProfesor"
                        type="button" 
                        class="px-4 py-2 bg-teal-800 hover:bg-teal-900 transition-colors my-4 text-center text-white font-bold"
                    >
                        Aceptar
                    </button>
                </div>
            </div>

            <div v-else>
                <p class="text-center text-lg font-bold text-slate-700 mb-4">
                    Este Vinculo ha Expirado o no es Valido
                </p>

                <div class="flex justify-center mt-10">
                    <div class="text-white bg-teal-800 rounded p-3">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-12 h-12">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v3.75m0-10.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.75c0 5.592 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.57-.598-3.75h-.152c-3.196 0-6.1-1.25-8.25-3.286Zm0 13.036h.008v.008H12v-.008Z" />
                        </svg>                      
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>