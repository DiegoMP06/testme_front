<script setup>
    import useResultados from '@/composables/tests/useResultados';
    import Pie from '@/components/graficas/Pie.vue';
    import Spinner from '@/components/UI/Spinner.vue';
    import Paginacion from '@/components/UI/Paginacion.vue';
    import Resultado from '@/components/tests/mostrar/Resultado.vue';
    import HeadingDashboard from '@/components/dashboard/HeadingDashboard.vue';
    import Instruccion from '@/components/tests/instrucciones/mostrar/Instruccion.vue';

    const {
        cargando,
        respuestas,
        test,
        version,
        busqueda,
        links,
        meta,
        page,
        formatearInstrucciones,
        obtenerResultados,
        hasResultados,
        hasVisitas,
    } = useResultados();
</script>

<template>
    <Spinner v-if="cargando" />

    <div v-else>
        <HeadingDashboard>
            Resultados de Version
        </HeadingDashboard>

        <div class="bg-white shadow rounded mt-10 space-y-4 p-4 max-w-4xl mx-auto divide-y-2 divide-slate-300">
            <h2 class="text-2xl font-black text-slate-700 truncate flex-1 p-2">
                {{ version.nombre }}
            </h2>

            <div class="p-2">
                <h3 class="text-teal-800 font-extrabold text-xl">Estadisticas</h3>

                <div class="mt-6 flex flex-col lg:flex-row gap-4" v-if="hasVisitas">
                    <div class="lg:w-1/3 bg-teal-800 rounded p-4">
                        <p class="text-white font-bold ">Tu Version de Test fue Contestada {{ version.visitas.length }} veces</p>

                        <ol class="mt-6 grid gap-2">
                            <li v-for="resultado in formatearInstrucciones" class="text-white font-bold p-2 bg-teal-900">
                                {{ resultado.label }}: 
                                <span class="text-slate-200">
                                    {{ resultado.value }} Persona(s)
                                </span>
                                {{ resultado.porcent }}%
                            </li>
                        </ol>
                    </div>

                    <div class="flex-1">
                        <Pie 
                            :datos="formatearInstrucciones"
                        />
                    </div>
                </div>

                <p class="text-slate-700 font-bold my-14 text-center" v-else>Nadie ha Respondido Esta Version</p>
            </div>

            <div class="p-2">
                <h3 class="text-teal-800 font-extrabold text-xl">Instrucciones</h3>

                <div class="mt-6 grid gap-4">
                    <Instruccion 
                        v-for="instruccion in version.instrucciones"
                        :instruccion="instruccion"
                    />
                </div>
            </div>
        </div>
        
        <div class="bg-white shadow rounded mt-10 p-4 max-w-4xl mx-auto">
            <h3 class="text-xl font-extrabold text-teal-800">Resultados: </h3>

            <div class="p-2">
                <form class="flex items-center gap-4" @submit="obtenerResultados">
                    <div class="flex flex-col md:flex-row md:items-center flex-1 gap-2">
                        <label for="busqueda" class="text-lg font-bold text-slate-700">Buscar Por Fecha</label>
                        <input class="flex-1 outline-none px-4 py-2 border-b-2 border-teal-800" type="date" name="busqueda" id="busqueda" v-model="busqueda">
                    </div>
                    
                    <button type="submit" class="p-2 rounded-full bg-teal-800 hover:bg-teal-900 transition-colors text-white">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                            <path stroke-linecap="round" stroke-linejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                        </svg>
                    </button>
                </form>
            </div>

            <div class="grid lg:grid-cols-2 gap-4 mt-4" v-if="hasResultados">
                <Resultado
                    v-for="resultado in respuestas"
                    :resultado="resultado"
                />
            </div>

            <p class="my-20 text-slate-700 font-bold text-center" v-else>
                No Hay Resultados
            </p>
        </div>

        <Paginacion 
            :meta="meta"
            :links="links"
            :page="page"
            @obtener-datos="obtenerResultados"
        />
    </div>
</template>