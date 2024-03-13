<script setup>
    import {RouterLink} from 'vue-router';

    const props = defineProps({
        isExamen: {
            required: true,
        },
        isPublico: {
            required: true,
        },
        hasRespuestas: {
            required: true,
        },
        canDeleteVersion: {
            required: true,
        },
        versionId: {
            required: true,
        },
        testId: {
            required: true,
        }
    });

    const emits = defineEmits([
        'handle-click-actualizar-publico',
        'handle-click-actualizar-respuestas',
        'handle-click-eliminar-version',
    ]);
</script>

<template>
    <div class="p-2 bg-emerald-50 mt-10">
        <h2 class="p-2 text-xl font-extrabold text-slate-700">Opciones de la Version: </h2>
        
        <div class="py-4 space-y-6 divide-y-2 divide-emerald-300">
            <div 
                class="p-2"
            >
                <h3 class="font-bold text-teal-800">¿Deseas ver Las Salas Enlazadas a la Version?</h3>

                <div>
                    <p class="py-4 px-2 text-slate-700 mb-6">Esta Opcion Te Llevara a una Pagina Donde se Muestran Todas Las Salas Enlazadas a Este Test.</p>
                    
                    <RouterLink :to="{name: 'dashboard.tests.version.salas', params: {testId, versionId}}" class="bg-teal-800 hover:bg-teal-900 text-white inline-block py-2 px-4 font-bold">
                        Ver Salas
                    </RouterLink>
                </div>
            </div>

            <div 
                class="p-2"
            >
                <h3 class="font-bold text-teal-800">¿Deseas ver Los Resultados de La Version?</h3>

                <div>
                    <p class="py-4 px-2 text-slate-700 mb-6">Esta Opcion Te Llevara a una Pagina Donde se Muestran Todos Los Resultados Obtenidos Con Este Test.</p>
                    
                    <RouterLink :to="{name: 'dashboard.tests.version.resultados', params: {testId, versionId}}" class="bg-teal-800 hover:bg-teal-900 text-white inline-block py-2 px-4 font-bold">
                        Ver Resultados
                    </RouterLink>
                </div>
            </div>

            <div class="p-2">
                <h3 class="font-bold text-teal-800">¿Deseas {{ isPublico ?  'Ocultar' : 'Publicar'}} la Version del Test?</h3>
                
                <div>
                    <p class="py-4 px-2 text-slate-700 mb-6">Esta Opcion {{ isPublico ?  'Ocultara' : 'Publicara'}} la Version {{ isPublico ?  'del Publico Evitando Registros en el' : 'al Publico Permitiendo Ingresar Registros'}}.</p>
                    
                    <button 
                        v-if="isPublico" 
                        @click="$emit('handle-click-actualizar-publico', versionId)" 
                        type="button" 
                        class="bg-rose-800 hover:bg-rose-900 text-white flex gap-2 justify-center py-2 px-4 font-bold "
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65m0 0a3 3 0 1 0-4.243-4.243m4.242 4.242L9.88 9.88" />
                        </svg>
                        Ocultar
                    </button>

                    <button 
                        v-else 
                        @click="$emit('handle-click-actualizar-publico', versionId)"
                        type="button" 
                        class="bg-teal-800 hover:bg-teal-900 text-white flex gap-2 justify-center py-2 px-4 font-bold"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
                            <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                        </svg>
                        Publicar
                    </button>
                </div>
            </div>

            <div 
                class="p-2"
                v-if="isExamen"
            >
                <h3 class="font-bold text-teal-800">¿Deseas {{ hasRespuestas ?  'Ocultar las Respuestas' : 'Publicar Las Respuestas'}} del Test?</h3>
                
                <div>
                    <p class="py-4 px-2 text-slate-700 mb-6">Esta Opcion  {{ hasRespuestas ?  'Ocultara' : 'Publicara'}} las Respuestas de tu Examen Despues de que tus Alumnos lo Respondan.</p>
                    
                    <button 
                        v-if="hasRespuestas" 
                        @click="$emit('handle-click-actualizar-respuestas', versionId)" 
                        type="button" 
                        class="bg-rose-800 hover:bg-rose-900 text-white flex gap-2 justify-center py-2 px-4 font-bold "
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65m0 0a3 3 0 1 0-4.243-4.243m4.242 4.242L9.88 9.88" />
                        </svg>
                        Ocultar
                    </button>

                    <button 
                        v-else 
                        @click="$emit('handle-click-actualizar-respuestas', versionId)" 
                        type="button" 
                        class="bg-teal-800 hover:bg-teal-900 text-white flex gap-2 justify-center py-2 px-4 font-bold "
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
                            <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                        </svg>
                        Publicar
                    </button>
                </div>
            </div>

            <div 
                class="p-2"
                v-if="canDeleteVersion"
            >
                <h3 class="font-bold text-teal-800">¿Deseas Eliminar la Version del Test?</h3>

                <div>
                    <p class="py-4 px-2 text-slate-700 mb-6">Esta Opcion Eliminara Solamente Esta Version del Test Permanentemente.</p>
                    
                    <button 
                        @click="$emit('handle-click-eliminar-version', versionId)"
                        class=" bg-rose-800 hover:bg-rose-900 py-2 px-4 text-white font-bold"
                        type="button"
                    >
                        Eliminar
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>