<script setup>
    import { computed } from 'vue';

    const props = defineProps({
        meta: {
            type: Object,
            required: true,
        },
        links: {
            type: Object,
            required: true,
        },
        page: {
            type: Number,
            required: true,
        }
    });

    const emits = defineEmits([
        'obtener-datos',
    ]);
    
    function handleClickAnterior() {
        emits('obtener-datos', props.page - 1);
    }

    function handleClickSiguiente() {
        emits('obtener-datos', props.page + 1);
    }

    function handleClickPage(pagina) {
        emits('obtener-datos', Number(pagina));
    }

    function handleClickFirstPage() {
        emits('obtener-datos', 1);
    }
    
    function handleClickLastPage() {
        emits('obtener-datos', props.meta.last_page);
    }

    const hasNext = computed(() => {
        return props.links.next;
    });

    const hasPrev= computed(() => {
        return props.links.prev;
    });

    const isPaginate = computed(() => {
        return props.meta.last_page > 1;
    });
</script>

<template>
    <div v-if="isPaginate" class="my-10">

        <div class="md:hidden flex gap-2 items-center justify-center md:justify-end">
            <button 
                v-if="hasPrev" 
                @click="handleClickAnterior"
                type="button" 
                class="py-2 px-4 text-white font-bold bg-teal-800 hover:bg-teal-900"
            >
                &lsaquo; Anterior
            </button>
    
            <button v-else type="button" disabled class="py-2 px-4 text-white font-bold bg-teal-950">&lsaquo; Anterior</button>
    
            <button 
                v-if="hasNext" 
                @click="handleClickSiguiente"
                type="button" 
                class="py-2 px-4 text-white font-bold bg-teal-800 hover:bg-teal-900"
            >
                Siguiente &rsaquo;
            </button>
    
            <button v-else type="button" disabled class="py-2 px-4 text-white font-bold bg-teal-950">Siguiente &rsaquo;</button>
        </div>

        <div class="hidden md:flex gap-2 justify-between">
            <div class="font-black">
                {{ meta.current_page }}
                <span class="font-normal">de</span>
                {{ meta.last_page }}
            </div>
    
            <div class="flex gap-2">
                <button 
                    v-if="hasPrev" 
                    @click="handleClickFirstPage"
                    type="button" 
                    class="py-2 px-4 text-white font-bold bg-teal-800 hover:bg-teal-900"
                >
                    &laquo;
                </button>
    
                <button v-else type="button" disabled class="py-2 px-4 text-white font-bold bg-teal-950">&laquo;</button>
    
                <button 
                    v-if="hasPrev" 
                    @click="handleClickAnterior"
                    type="button" 
                    class="py-2 px-4 text-white font-bold bg-teal-800 hover:bg-teal-900"
                >
                    &lsaquo;
                </button>
    
                <button v-else disabled type="button" class="py-2 px-4 text-white font-bold bg-teal-950">&lsaquo;</button>
    
                <button 
                    v-for="link in links.links"
                    @click="handleClickPage(link.label)"
                    type="button" 
                    class="py-2 px-3 text-white font-bold bg-teal-800 hover:bg-teal-900"
                    :class="{'bg-teal-950 hover:bg-teal-950': link.active}"
                    :disabled="link.active"
                >
                    {{ link.label }}
                </button>
    
                <button 
                    v-if="hasNext" 
                    @click="handleClickSiguiente"
                    type="button" 
                    class="py-2 px-4 text-white font-bold bg-teal-800 hover:bg-teal-900"
                >
                    &rsaquo;
                </button>
    
                <button v-else type="button" disabled class="py-2 px-4 text-white font-bold bg-teal-950">&rsaquo;</button>
    
                <button 
                    v-if="hasNext" 
                    @click="handleClickLastPage"
                    type="button" 
                    class="py-2 px-4 text-white font-bold bg-teal-800 hover:bg-teal-900"
                >
                    &raquo;
                </button>
    
                <button v-else type="button" disabled class="py-2 px-4 text-white font-bold bg-teal-950">&raquo;</button>
            </div>
        </div>
    </div>
</template>