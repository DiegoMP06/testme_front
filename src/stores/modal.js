import { ref, computed, watch } from "vue";
import {defineStore} from 'pinia';

export const useModalStore = defineStore('modal', () => {

    const animar = ref(false);
    const mostrar = ref(false);
    const modal = ref(null);
    const editando = ref(false);

    watch(mostrar, () => {
        if(!mostrar.value) {
            modal.value = null;
            editando.value = false;
        }
    });

    function handleClickMostrarModal(key) {
        modal.value = key;
        mostrarModal();
    }

    function mostrarModal() {
        mostrar.value = true;

        setTimeout(() => {
            animar.value = true;
        }, 300);
    }

    function handleClickQuitar() {
        animar.value = false;

        setTimeout(() => {
            mostrar.value = false;
        }, 300);
    }
    const isAnimar = computed(() => {
        return animar.value;
    });

    const isModal = computed(() => {
        return mostrar.value;
    });

    const hasModal = computed(() => {
        return modal.value;
    });

    return {
        mostrar,
        editando,
        handleClickMostrarModal,
        handleClickQuitar,
        isAnimar,
        isModal,
        hasModal,
    };
});