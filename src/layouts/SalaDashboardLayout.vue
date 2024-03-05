<script setup>
    import Spinner from '@/components/UI/Spinner.vue';
    import HeadingDashboard from '@/components/dashboard/HeadingDashboard.vue';
    import NavegacionSala from '@/components/salas/mostrar/NavegacionSala.vue';

    defineProps({
        heading: {
            required: true,
            type: String,
        },
        cargando: {
            required: true,
            type: Boolean,
        },
        sala: {
            required: true,
            type: Object,
        },
        inicio: {
            type: [null, Boolean]
        }
    });
</script>

<template>
    <Spinner v-if="cargando" />

    <div v-else>
        <HeadingDashboard>
            {{ heading }}
        </HeadingDashboard>

        <NavegacionSala 
            :sala-id="sala.id"
        />

        <slot name="header"></slot>

        <div class="max-w-6xl mx-auto bg-white px-4 py-6 mt-10 shadow space-y-8">
            <h2 class="text-2xl text-slate-700 font-black px-2" v-if="!inicio">
                {{ sala.nombre }}
            </h2>

            <slot name="contenido"></slot>
        </div>

        <slot name="footer"></slot>
    </div>
</template>