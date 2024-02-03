import {computed, ref} from 'vue';

export default function useAcordeon() {
    const open = ref(false);
    const animar = ref(false);

    const handleClickAcordeonAnimar = () => {
        if(open.value) {
            handleClickCloseAnimar();
        } else {
            handleClickOpenAnimar();
        }
    }

    const handleClickOpenAnimar = () => {
        open.value = true;

        setTimeout(() => {
            animar.value = true;
        }, 300);
    }

    const handleClickCloseAnimar = () => {
        animar.value = false;
        
        setTimeout(() => {
            open.value = false;
        }, 300);
    }

    const handleClickAcordeon = () => {
        if(open.value) {
            open.value = false;
        } else {
            open.value = true;
        }
    }

    const isOpen = computed(() => {
        return open.value;
    });

    const isAnimar = computed(() => {
        return open.value;
    });

    return {
        handleClickAcordeon,
        handleClickAcordeonAnimar,
        isOpen,
        isAnimar,
    };
};