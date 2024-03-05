<script setup>
    import useAcordeon from '@/composables/useAcordeon';

    const {
        handleClickAcordeon,
        handleClickAcordeonAnimar,
        isOpen,
        isAnimar,
    } = useAcordeon();

    const props = defineProps({
        animar: {
            type: [null, Boolean],
            required: true,
        }
    });

    function handleClick() {
        if(props.animar) {
            handleClickAcordeonAnimar();
        } else {
            handleClickAcordeon();
        }
    }
</script>

<template>
    <div class="p-3 w-full bg-emerald-50 rounded">
        <div class="flex gap-4 items-center cursor-pointer" @click="handleClick">
            <div class="flex-1">
                <slot name="header"></slot>
            </div>

            <div 
                v-if="isOpen"
                type="button" 
                class="w-7 h-7"
            >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-full h-full">
                    <path stroke-linecap="round" stroke-linejoin="round" d="m4.5 15.75 7.5-7.5 7.5 7.5" />
                </svg>
            </div>

            <div 
                v-else
                type="button" 
                class="w-7 h-7"
            >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-full h-full">
                    <path stroke-linecap="round" stroke-linejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
                </svg>
                  
            </div>
        </div>

        <div 
            v-if="animar"
            :class="[isAnimar ? 'max-h-full mt-4' : 'max-h-0 overflow-hidden mt-0 opacity-0']" 
            class="animar opacity-1 overflow-y-auto"
        >
            <div
                :class="{'py-0': !isAnimar}" 
                class="py-2 animar"
            >
                <slot name="body"></slot>
            </div>
        </div>

        <div 
            v-else-if="isOpen"
            class="mt-4"
        >
            <div
                class="py-2"
            >
                <slot name="body"></slot>
            </div>
        </div>

        <div>
            <slot name="footer"></slot>
        </div>
    </div>
</template>