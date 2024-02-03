<script setup>
    import { computed } from 'vue';
    import BarraNavegacionCrear from './BarraNavegacionCrear.vue';

    const props = defineProps({
        test: {
            type: Object,
            required: true,
        },
        preguntasNormales: {
            type: Array,
            required: true,
        },
        opcionesNormales: {
            type: Array,
            required: true,
        },
        preguntasExtras: {
            type: Array,
            required: true,
        },
        instrucciones: {
            type: Array,
            required: true,
        },
        getCategoria: {
            type: Object,
            required: true,
        },
        getTipo: {
            type: Object,
            required: true,
        },
        editando: {
            type: Boolean,
            required: true,
        }
    });

    const emits = defineEmits([
        'handle-click-page',
        'crear-test',
        'editar-test'
    ]);

    const getCountOpciones = computed(() => {
        if(props.test.tipo_id === 1) return props.opcionesNormales.length;

        const cantidades = props.opcionesNormales.map(opcion => opcion.opciones.length);
        return cantidades.reduce((total, cantidad) => total +  cantidad, 0);
    });
</script>

<template>
    
    <BarraNavegacionCrear
        @handle-click-page="$emit('handle-click-page', $event)"
    />

    <div class="divide-y-2 divide-slate-300 space-y-5">
        <p class="text-lg font-bold text-emerald-800">
            Nombre:
            <span class="font-normal text-slate-700">
                {{ test.nombre }}
            </span>
        </p>

        <div>
            <p class="text-lg font-bold text-emerald-800">
                Descripcion:
            </p>
    
            <blockquote class="mt-3 text-lg text-slate-700">
                {{ test.descripcion }}
            </blockquote>
        </div>

        <div>
            <p class="text-lg font-bold text-emerald-800">
                Categoria:
                <span class="font-normal text-slate-700">
                    {{ getCategoria.categoria }}
                </span>
            </p>
    
            <div class="flex flex-col sm:flex-row gap-5 sm:justify-between">
                <blockquote class="mt-5 text-lg text-slate-700">
                    {{ getCategoria.descripcion }}
                </blockquote>
    
                <img 
                    class="max-w-20 max-h-20"
                    :src="'/img/' + getCategoria.imagen" 
                    :alt="`Icono de la Categoria de ${getCategoria.categoria}`" 
                />
            </div>
        </div>

        <div>
            <p class="text-lg font-bold text-emerald-800">
                Tipo de Test:
                <span class="font-normal text-slate-700">
                    {{ getTipo.tipo }}
                </span>
            </p>
    
            <blockquote class="mt-3 text-lg text-slate-700">
                {{ getTipo.descripcion }}
            </blockquote>
        </div>

        <p class="text-lg font-bold text-emerald-800">
            Numero de Campos Extra: 
            <span class="font-normal text-slate-700">
                {{ preguntasExtras.length }}
            </span>
        </p>

        <p class="text-lg font-bold text-emerald-800">
            Numero de Campos del Test: 
            <span class="font-normal text-slate-700">
                {{ preguntasNormales.length }}
            </span>
        </p>
        
        <p class="text-lg font-bold text-emerald-800">
            Numero de Opciones: 
            <span class="font-normal text-slate-700">
                {{ getCountOpciones }}
            </span>
        </p>
        
        <p class="text-lg font-bold text-emerald-800">
            Numero de instrucciones: 
            <span class="font-normal text-slate-700">
                {{ instrucciones.length }}
            </span>
        </p>
    </div>

    <div class="mt-10">
        <button 
            v-if="editando"
            @click="$emit('editar-test')"
            class="py-2 px-4 bg-teal-800 text-center font-bold text-white hover:bg-emerald-900 w-full"
            type="button"
        >
            Guardar Cambios
        </button>

        <button 
            v-else
            @click="$emit('crear-test')"
            class="py-2 px-4 bg-teal-800 text-center font-bold text-white hover:bg-emerald-900 w-full"
            type="button"
        >
            Crear Test
        </button>
    </div>
</template>