import { ref, computed } from "vue";

export default function useHeader() {
    const menu = ref(false);
    const animar = ref(false);
    const submenu = ref(false);
    const subanimar = ref(false);
    const menuUser = ref(false);
    const animarUser = ref(false);

    function handleClickMenuUser() {
        if(menuUser.value) {
            quitarMenuUser();
        } else {
            mostrarMenuUser();
        }
    }

    function mostrarMenuUser() {
        menuUser.value = true;

        setTimeout(() => {
            animarUser.value = true;
        }, 300);
    }

    function quitarMenuUser() {
        animarUser.value = false;

        setTimeout(() => {
            menuUser.value = false;
        }, 300);
    }

    function handleClickMenu() {
        if(menu.value) {
            quitarMenu();
        } else {
            mostrarMenu();
        }
    }

    function quitarMenu() {
        animar.value = false;

        setTimeout(() => {
            menu.value = false;
        }, 300);
    }

    function mostrarMenu() {
        menu.value = true;

        setTimeout(() => {
            animar.value = true;
        }, 300);
    }

    function handleClickSubMenu() {
        if(submenu.value) {
            quitarSubMenu();
        } else {
            mostrarSubMenu();
        }
    }

    function quitarSubMenu() {
        subanimar.value = false;

        setTimeout(() => {
            submenu.value = false;
        }, 300);
    }

    function mostrarSubMenu() {
        submenu.value = true;

        setTimeout(() => {
            subanimar.value = true;
        }, 300);
    }
    
    const isOpenMenuUser = computed(() => {
        return menuUser.value;
    });

    const isAnimarUser = computed(() => {
        return animarUser.value;
    });

    const isOpenMenu = computed(() => {
        return menu.value;
    });

    const isAnimar = computed(() => {
        return animar.value;
    });

    const isOpenSubMenu = computed(() => {
        return submenu.value;
    });

    const isSubAnimar = computed(() => {
        return subanimar.value;
    });

    return {
        handleClickMenuUser,
        handleClickMenu,
        handleClickSubMenu,
        isOpenMenuUser,
        isOpenMenu,
        isOpenSubMenu,
        isAnimarUser,
        isAnimar,
        isSubAnimar,
    };
}