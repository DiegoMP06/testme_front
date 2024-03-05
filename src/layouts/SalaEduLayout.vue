<script setup>
    import useEduSala from '@/composables/salas/useEduSala';
    import Spinner from '@/components/UI/Spinner.vue';
    import { useModalStore } from '@/stores/modal';
    import HeadingDashboard from '@/components/dashboard/HeadingDashboard.vue';
    import SideBarSala from '@/components/salas/edu/SideBarSala.vue';
    import ContenidoSala from '@/components/salas/edu/ContenidoSala.vue';
    import IngresarPassword from '@/components/salas/edu/IngresarPassword.vue';
    import ModalDashboard from '@/components/UI/ModalDashboard.vue';

    const modalStore = useModalStore();

    const {
        cargando,
        subCargando,
        sala,
        errores,
        password,
        handleClickEliminarEnlace,
        handleClickEnlazar,
        handleSubmitPassword,
        quitarModal,
        isEnlazado,
        isCreador,
        isTeacher,
        canUnirse,
    } = useEduSala();
</script>

<template>
    <Spinner v-if="cargando" />

    <div v-else>
        <HeadingDashboard>
            {{ sala.nombre }}
        </HeadingDashboard>

        <div class="mt-10 lg:flex">
            <div class="lg:w-1/3">
                <SideBarSala 
                    :sala="sala"
                    :can-unirse="canUnirse"
                    :is-enlazado="isEnlazado"
                    :is-creador="isCreador"
                    @handle-click-enlazar="handleClickEnlazar"
                    @handle-click-eliminar-enlace="handleClickEliminarEnlace"
                />
            </div>

            <div class="flex-1 bg-white shadow rounded-b lg:rounded-bl-none lg:rounded-r flex flex-col">
                <ContenidoSala 
                    :sala="sala"
                    :is-enlazado="isEnlazado"
                    :is-creador="isCreador"
                    :is-teacher="isTeacher"
                />
            </div>
        </div>
    </div>

    <ModalDashboard 
        v-if="modalStore.isModal"
        :sub-cargando="subCargando"
        @quitar-modal="quitarModal"
    >
        <IngresarPassword 
            v-if="modalStore.hasModal === 4.1"
            v-model:password="password"
            :errores="errores"
            @handle-submit-password="handleSubmitPassword"
        />
    </ModalDashboard>
</template>