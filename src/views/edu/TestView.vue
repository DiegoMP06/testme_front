<script setup>
    import useEduTest from '@/composables/tests/useEduTest';
    import HeadingDashboard from '@/components/dashboard/HeadingDashboard.vue';
    import Spinner from '@/components/UI/Spinner.vue';
    import PrimerPagina from '@/components/tests/edu/PrimerPagina.vue';
    import SegundaPagina from '@/components/tests/edu/SegundaPagina.vue';
    import TercerPagina from '@/components/tests/edu/TercerPagina.vue';
    import { formatearVersion } from '@/helpers';

    const {
        page,
        cargando,
        handleClickSubmit,
        handleClickPage,
        test,
        visita,
        isCreador,
        getInstruccion,
        canWatchRespuestas,
    } = useEduTest();

</script>

<template>
    <Spinner v-if="cargando" />

    <div v-else>
        <HeadingDashboard>{{ test.nombre }}</HeadingDashboard>

        <div class="bg-white shadow mt-10 max-w-4xl mx-auto">
            <p class="text-xs text-end pr-4 pt-2">
                {{ formatearVersion(test.version) }}
            </p>

            <div class="divide-y-2 divide-slate-300 space-y-4 px-4 pb-8 pt-4">
                <div class="flex items-center gap-4 flex-col md:flex-row justify-between p-2">
                    <div class="flex gap-4 items-center">
                        <img 
                            class="max-w-14 max-h-14"
                            :src="`/img/${test.categoria?.imagen}`"
                            :alt="`Icono de la Categoria ${test.categoria?.categoria}`"
                        />
            
                        <p class="text-jg font-extrabold text-slate-700">
                            Categoria: 
                            <span class="font-semibold">
                                {{ test.categoria?.categoria }}
                            </span>
                        </p>
                    </div>
            
                    <p class="text-jg font-extrabold text-slate-700">
                        Tipo: 
                        <span class="font-semibold">
                            {{ test.tipo?.tipo }}
                        </span>
                    </p>
            
                    <RouterLink 
                        :to="{name: 'user.perfil', params: {user: test.user.usuario}}" 
                        class="text-sm font-normal text-slate-600 flex gap-2"
                    >
                        <img 
                            class="w-10 h-10 rounded-full"
                            :src="test.user?.imagen ?? '/img/perfil.webp'" 
                            :alt="`imagen de perfil ${test.user.usuario}`"
                        />
            
                        <span class="flex flex-col">
                            {{ `${test.user?.name} ${test.user?.apellido_paterno} ${test.user?.apellido_materno}` }}
            
                            <span class="text-xs font-black">
                                {{ test.user?.usuario }}
                            </span>
                        </span>
                    </RouterLink>
                </div>

                <div class="p-2">
                    <p class="text-teal-800 text-lg font-extrabold">
                        Descripcion: 
                    </p>
            
                    <blockquote class="text-slate-700 my-6">
                        {{ test.descripcion }}
                    </blockquote>
                </div>

                <PrimerPagina 
                    v-if="page === 1"
                    :test="test"
                    :is-creador="isCreador"
                    @handle-click-submit="handleClickSubmit"
                />
    
                <SegundaPagina
                    v-else-if="page === 2"
                    :test="test"
                    :visita="visita"
                    :can-watch-respuestas="canWatchRespuestas"
                    :get-instruccion="getInstruccion"
                    @handle-click-page="handleClickPage"
                />

                <TercerPagina 
                    v-else
                    :test="test"
                    :visita="visita"
                    @handle-clik-page="handleClickPage"
                />
            </div>
        </div>
    </div>
</template>