<script setup>
    import {FormKit} from '@formkit/vue';
    import useCrearSala from '@/composables/salas/useCrearSala';
    import HeadingDashboard from '@/components/dashboard/HeadingDashboard.vue';
    import AccionesDashboard from '@/components/dashboard/AccionesDashboard.vue';
    import Spinner from '@/components/UI/Spinner.vue';

    const {
        rules,
        cargando,
        sala,
        handleSubmit,
        isPrivate,
    } = useCrearSala();
</script>

<template>
    <Spinner v-if="cargando"/>

    <div v-else>
        <HeadingDashboard>
            Crear Sala
        </HeadingDashboard>
    
        <AccionesDashboard 
            :opciones="{name: 'dashboard.salas'}"
        >
            Volver
        </AccionesDashboard>
    
        <div class="bg-white shadow rounded py-6 px-4 max-w-4xl mx-auto mt-10">
            <FormKit 
                type="form"
                submit-label="Crear Sala"
                incomplete-message="Revisa Los Mensajes de Error"
                :value="sala"
                @submit="handleSubmit"
            >
                <FormKit 
                    type="text"
                    label="Nombre: "
                    placeholder="Nombre de la Sala"
                    name="nombre"
                    validation="required|length:0,100"
                    v-model="sala.nombre"
                    :validation-messages="rules.nombre"
                />
    
                <FormKit 
                    type="textarea"
                    label="Descripcion: "
                    placeholder="Descipcion de la Sala"
                    name="descripcion"
                    validation="required|length:50,1000"
                    v-model="sala.descripcion"
                    :validation-messages="rules.descripcion"
                />
    
                <FormKit 
                    type="number"
                    label="Cantidad Maxima de Alumnos: "
                    placeholder="Ej. 20"
                    name="num_alumnos"
                    validation="required|number|min:1|max:1000"
                    min="1"
                    max="1000"
                    v-model="sala.num_alumnos"
                    :validation-messages="rules.num_alumnos"
                />
    
                <FormKit 
                    type="number"
                    label="Cantidad Maxima de Profesores Colegas: "
                    placeholder="Ej. 20"
                    name="num_profesores"
                    validation="number|max:20|min:0"
                    min="0"
                    max="20"
                    v-model="sala.num_profesores"
                    :validation-messages="rules.num_profesores"
                />
               
                <FormKit 
                    type="select"
                    label="Estatus: "
                    name="publico"
                    validation="required|number|min:0|max:1"
                    :options="[{label: 'Publico', value: 1}, {label: 'Privado', value: 0}]"
                    v-model="sala.publico"
                    :validation-messages="rules.publico"
                />
    
                <FormKit 
                    v-if="isPrivate"
                    type="password"
                    label="Clave de Ingreso: "
                    placeholder="Clave de la Sala"
                    name="password"
                    validation="required|length:6,20"
                    v-model="sala.password"
                    :validation-messages="rules.password"
                />
            </FormKit>
        </div>
    </div>
</template>