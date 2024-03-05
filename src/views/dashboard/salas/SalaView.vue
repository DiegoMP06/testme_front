<script setup>
    import useSala from "@/composables/salas/useSala";
    import { useModalStore } from "@/stores/modal";
    import ModalDashboard from "@/components/UI/ModalDashboard.vue";
    import EditarNombre from '@/components/salas/editar/EditarNombre.vue'
    import EditarDescripcion from '@/components/salas/editar/EditarDescripcion.vue'
    import EditarNumAlumnos from '@/components/salas/editar/EditarNumAlumnos.vue'
    import EditarNumProfesores from '@/components/salas/editar/EditarNumProfesores.vue'
    import EditarPassword from "@/components/salas/editar/EditarPassword.vue";
    import OpcionesSala from "@/components/salas/mostrar/OpcionesSala.vue";
    import SalaDashboardLayout from '@/layouts/SalaDashboardLayout.vue';
    
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
        handleClickEliminarSala,
        hasNumProfesores,
        isPublico,
        isAcceso,
    } = useSala();
</script>

<template>
    <SalaDashboardLayout 
        heading="Administrar Sala"
        :cargando="cargando"
        :sala="sala"
        :inicio="true"
    >
        <template v-slot:contenido>
            <div class="flex gap-6 items-center p-2">
                <h2 class="text-2xl text-slate-700 font-black flex-1 truncate">
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
                        {{ sala.alumnos }} de {{ sala.num_alumnos }} alumno(s)
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
                        {{ hasNumProfesores ?  `${sala.profesores} de ${sala.num_profesores} profesores(s) de Asistencia` : 'Sin Profesores de Asistencia' }} 
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
    
            <OpcionesSala 
                :is-acceso="isAcceso"
                :is-publico="isPublico"
                @handle-click-actualizar-publico="handleClickActualizarPublico"
                @handle-click-actualizar-password="handleClickActualizarPassword"
                @handle-click-actualizar-acceso="handleClickActualizarAcceso"
                @handle-click-eliminar-sala="handleClickEliminarSala"
            />
        </template>
    </SalaDashboardLayout>

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