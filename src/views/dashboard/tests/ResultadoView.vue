<script setup>
    import { RouterLink } from 'vue-router';
    import useResultado from '@/composables/tests/useResultado';
    import {formatearFecha} from '@/helpers';
    import Spinner from '@/components/UI/Spinner.vue';
    import HeadingDashboard from '@/components/dashboard/HeadingDashboard.vue';
    import Instruccion from '@/components/tests/instrucciones/mostrar/Instruccion.vue';
    import Respuesta from '@/components/tests/preguntas/edu/Respuesta.vue';

    const {
        cargando,
        version,
        test,
        visita,
        isExamen,
        isMultiple,
    } = useResultado();
</script>

<template>
    <Spinner v-if="cargando" />

    <div v-else>
        <HeadingDashboard>
            Ver Resultado
        </HeadingDashboard>

        <div class="bg-white shadow rounded mt-10 space-y-4 p-4 max-w-4xl mx-auto divide-y-2 divide-slate-300">
            <h2 class="text-2xl font-black text-slate-700 truncate flex-1 p-2">
                {{ version.nombre }}
            </h2>

            <div>
                <p class="text-slate-700 text-xl p-2 my-6 text-center">
                    <span class="font-bold text-teal-700">
                        {{ visita.puntuacion }}
                    </span>
                    de 
                    <span class="font-bold text-teal-700">
                        {{ visita.total }}
                    </span>
                    puntos
                </p>
        
                <Respuesta 
                    v-for="campo in version.camposExtra"
                    :campo="campo"
                    :respuestas="visita.respuestas"
                />
                
                <Respuesta 
                    v-for="campo in version.campos"
                    :campo="campo"
                    :respuestas="visita.respuestas"
                    :normal="true"
                    :num-campos="version.campos.length"
                    :is-examen="isExamen"
                    :is-multiple="isMultiple"
                />
            </div>

            <div class="p-4 flex flex-col lg:flex-row">
                <RouterLink 
                    v-if="visita.user.id" 
                    :to="{name: 'user.perfil', params: {user: visita.user.usuario}}" 
                    class="p-4 bg-slate-100 hover:bg-slate-200 transition-colors rounded flex flex-col md:flex-row gap-4 md:items-center md:justify-center lg:w-1/2"
                >
                    <img 
                        src="/img/perfil.webp" 
                        :alt="`Imagen de perfil de ${visita.user.usuario}`"
                        class="w-20 h-20 rounded-full"
                    />

                    <div class="flex flex-col">
                        <p class="text-lg font-semibold text-slate-700">
                            {{ `${visita.user.name} ${visita.user.apellido_paterno} ${visita.user.apellido_materno}` }}
                        </p>

                        <p class="text-md font-extrabold">
                            {{ visita.user.usuario }}
                        </p>
                    </div>
                </RouterLink>

                <div class="flex-1 text-lg font-bold text-center mt-10">
                    Lo Contesto el {{ formatearFecha(visita.created_at) }}
                </div>
            </div>
        </div>
    </div>
</template>