<script setup>
    import useSala from "@/composables/salas/useSala";
    import { useModalStore } from "@/stores/modal";
    import ModalDashboard from "@/components/UI/ModalDashboard.vue";
    import Spinner from '@/components/UI/Spinner.vue';
    import HeadingDashboard from '@/components/dashboard/HeadingDashboard.vue';
    import EditarNombre from '@/components/salas/editar/EditarNombre.vue'
    import EditarDescripcion from '@/components/salas/editar/EditarDescripcion.vue'
    import EditarNumAlumnos from '@/components/salas/editar/EditarNumAlumnos.vue'
    import EditarNumProfesores from '@/components/salas/editar/EditarNumProfesores.vue'
    import EditarPassword from "@/components/salas/editar/EditarPassword.vue";

    const modalStore = useModalStore();

    const {
        cargando,
        subCargando,
        sala,
        nombre,
        descripcion,
        numAlumnos,
        numProfesores,
        password,
        quitarModal,
        handleClickActualizarNombre,
        handleSubmitNombre,
        handleClickActualizarDescripcion,
        handleSubmitDescripcion,
        handleClickActualizarNumAlumnos,
        handleSubmitNumAlumnos,
        handleClickActualizarNumProfesores,
        handleSubmitNumProfesores,
        handleClickActualizarPublico,
        handleSubmitOcultarSala,
        handleClickActualizarPassword,
        handleSubmitPassword,
        handleClickActualizarAcceso,
        hasNumProfesores,
        isPublico,
        isAcceso,
    } = useSala();
</script>

<template>
    <Spinner v-if="cargando" />

    <div v-else>
        <HeadingDashboard >
            Administrar Sala
        </HeadingDashboard>

        <div class="max-w-6xl mx-auto bg-white px-4 py-6 mt-10 shadow divide-y-2 space-y-8 divide-slate-300">
            <div class="flex gap-6 items-center p-2">
                <h2 class="text-2xl text-slate-700 font-black flex-1">
                    {{ sala.nombre }}
                </h2>

                <button  
                    @click="handleClickActualizarNombre"
                    class="p-1 transition-colors rounded text-slate-700 hover:bg-slate-100 border-2 shadow border-slate-300"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
                        <path stroke-linecap="round" stroke-linejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125" />
                    </svg>                      
                </button>
            </div>

            <div class="p-2">
                <div class="flex gap-6 items-center mb-4">
                    <h3 class="text-xl font-black text-teal-800 mb-3 flex-1">Descripcion: </h3>
                    
                    <button 
                        @click="handleClickActualizarDescripcion"
                        class="p-1 transition-colors rounded text-slate-700 hover:bg-slate-100 border-2 shadow border-slate-300"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
                            <path stroke-linecap="round" stroke-linejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125" />
                        </svg>                      
                    </button>
                </div>

                <blockquote class="text-slate-700">
                    {{ sala.descripcion }}
                </blockquote>
            </div>
            
            <div class="p-2">
                <div class="flex gap-6 items-center mb-6">
                    <h2 class="text-xl text-teal-800 font-black flex-1">
                        0 de {{ sala.num_alumnos }} alumno(s)
                    </h2>

                    <button 
                        @click="handleClickActualizarNumAlumnos"
                        class="p-1 transition-colors rounded text-slate-700 hover:bg-slate-100 border-2 shadow border-slate-300"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
                            <path stroke-linecap="round" stroke-linejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125" />
                        </svg>                      
                    </button>
                </div>

                <p class="text-slate-700">Esta es la Cantidad Maxima de Alumnos que Puedes Monitorear en Su Estancia en la Sala.</p>
            </div>

            <div class="p-2">
                <div class="flex gap-6 items-center mb-6">
                    <h2 class="text-xl text-teal-800 font-black flex-1">
                        {{ hasNumProfesores ?  `0 de ${sala.num_profesores} profesores(s) de Asistencia` : 'Sin Profesores de Asistencia' }} 
                    </h2>

                    <button 
                        @click="handleClickActualizarNumProfesores"
                        class="p-1 transition-colors rounded text-slate-700 hover:bg-slate-100 border-2 shadow border-slate-300"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
                            <path stroke-linecap="round" stroke-linejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125" />
                        </svg>                      
                    </button>
                </div>

                <p class="text-slate-700">Esta es la Cantidad de Profesores que Pueden Asistirte en esta Sala.</p>
            </div>

            <div class="p-2 bg-emerald-50 mt-10">
                <h3 class="p-2 text-xl font-extrabold text-slate-700">Opciones de la Sala: </h3>

                <div class="py-4 space-y-6 divide-y-2 divide-emerald-300">
                    <div class="p-2">
                        <h3 class="font-bold text-teal-800">¿Deseas {{ isPublico ?  'Ocultar' : 'Publicar'}} la Sala?</h3>

                        <div>
                            <p class="py-4 px-2 text-slate-700 mb-6">Esta Opcion {{ isPublico ? 'no Dejara Inscribir a tu Sala a Nadie que no Tenga la Clave de Ingreso' : 'Dejara Inscribir a tu Sala a Todas Las Personas sin Restricciones' }}.</p>

                            <button 
                                v-if="isPublico" 
                                @click="handleClickActualizarPublico" 
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
                                @click="handleClickActualizarPublico"
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
                    
                    <div class="p-2" v-if="!isPublico">
                        <h3 class="font-bold text-teal-800">¿Deseas Cambiar la Clave de la Sala?</h3>

                        <div>
                            <p class="py-4 px-2 text-slate-700 mb-6">Esta Opcion Cambiara la Clave de Acceso a tu Sala.</p>

                            <button 
                                @click="handleClickActualizarPassword"
                                type="button" 
                                class="bg-teal-800 hover:bg-teal-900 text-white flex gap-2 justify-center py-2 px-4 font-bold"
                            >
                                Cambiar Clave
                            </button>
                        </div>
                    </div>

                    <div class="p-2">
                        <h3 class="font-bold text-teal-800">¿Deseas {{ isAcceso ?  'Detener' : 'Habilitar'}} el Acceso a la Sala?</h3>

                        <div>
                            <p class="py-4 px-2 text-slate-700 mb-6">Esta Opcion {{ isAcceso ? 'no Dejara Inscribir a Nadie a tu Sala' : 'Dejara Inscribir a Personas a tu Sala' }}.</p>

                            <button 
                                v-if="isAcceso" 
                                @click="handleClickActualizarAcceso" 
                                type="button" 
                                class="bg-rose-800 hover:bg-rose-900 text-white flex gap-2 justify-center py-2 px-4 font-bold "
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M18.364 18.364A9 9 0 0 0 5.636 5.636m12.728 12.728A9 9 0 0 1 5.636 5.636m12.728 12.728L5.636 5.636" />
                                </svg>                              
                                Detener Acceso
                            </button>

                            <button 
                                v-else 
                                @click="handleClickActualizarAcceso"
                                type="button" 
                                class="bg-teal-800 hover:bg-teal-900 text-white flex gap-2 justify-center py-2 px-4 font-bold "
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                                </svg>                              
                                Habilitar Acceso
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <ModalDashboard 
        v-if="modalStore.isModal"
        :sub-cargando="subCargando"
        @quitar-modal="quitarModal"
    >
        <EditarNombre 
            v-if="modalStore.hasModal === 2.1"
            v-model:nombre="nombre"
            :sala="sala"
            @handle-submit-nombre="handleSubmitNombre"
        />

        <EditarDescripcion 
            v-else-if="modalStore.hasModal === 2.2"
            v-model:descripcion="descripcion"
            :sala="sala"
            @handle-submit-descripcion="handleSubmitDescripcion"
        />

        <EditarNumAlumnos 
            v-else-if="modalStore.hasModal === 2.3"
            v-model:num-alumnos="numAlumnos"
            :sala="sala"
            @handle-submit-num-alumnos="handleSubmitNumAlumnos"
        />

        <EditarNumProfesores 
            v-else-if="modalStore.hasModal === 2.4"
            v-model:num-profesores="numProfesores"
            :sala="sala"
            @handle-submit-num-profesores="handleSubmitNumProfesores"
        />

        <EditarPassword 
            v-else-if="modalStore.hasModal === 2.5"
            v-model:password="password"
            @handle-submit-password="handleSubmitOcultarSala"
        />

        <EditarPassword 
            v-else
            v-model:password="password"
            @handle-submit-password="handleSubmitPassword"
        />
    </ModalDashboard>
</template>