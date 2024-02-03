<script setup>
    import useCrearTest from '@/composables/tests/useCrearTest'
    import {useModalStore} from '@/stores/modal'
    import HeadingDashboard from '@/components/dashboard/HeadingDashboard.vue';
    import AccionesDashboard from '@/components/dashboard/AccionesDashboard.vue';
    import PrimerPagina from '@/components/tests/crear/PrimerPagina.vue'
    import SegundaPagina from '@/components/tests/crear/SegundaPagina.vue'
    import TercerPagina from '@/components/tests/crear/TercerPagina.vue'
    import Preview from '@/components/tests/crear/Preview.vue';
    import ModalDashboard from '@/components/UI/ModalDashboard.vue';
    import CrearPregunta from '@/components/tests/preguntas/crear/CrearPregunta.vue'
    import CrearOpcion from '@/components/tests/preguntas/crear/CrearOpcion.vue'
    import CrearCampo from '@/components/tests/campos/crear/CrearCampo.vue';
    import CrearInstruccion from '@/components/tests/instrucciones/crear/CrearInstruccion.vue';
    import Spinner from '@/components/UI/Spinner.vue';

    const modalStore = useModalStore();

    const {
        cargando,
        editando,
        crearInstrucciones,
        page,
        selectsCategorias,
        selectsTipos, 
        selectsCampos,
        inputsCampos,
        rules,
        test,
        pregunta,
        opcion,
        instruccion,
        preguntasNormales,
        opcionesNormales,
        preguntasExtras,
        opcionesExtras,
        instrucciones,
        puntajeActual,
        puntajeMaximo,
        puntajeMinimo,
        crearTest,
        editarTest,
        resetearCampo,
        resetearOpciones,
        quitarModal,
        handleClickAnterior,
        handleClickSiguiente,
        handleClickPage,
        handleClickMultiple,
        handleClickCrearPregunta,
        handleClickActualizarPregunta,
        handleClickEliminarPregunta,
        handleSubmitPregunta,
        handleClickCrearOpcion,
        handleClickActualizarOpcion,
        handleClickEliminarOpcion,
        handleSubmitOpcion,
        handleClickCrearCampo,
        handleClickActualizarCampo,
        handleClickEliminarCampo,
        handleSubmitCampo,
        handleClickCrearOpcionCampo,
        handleClickActualizarOpcionCampo,
        handleClickEliminarOpcionCampo,
        handleSubmitOpcionCampo,
        handleClickCrearInstruccion,
        handleClickActualizarInstruccion,
        handleClickEliminarInstruccion,
        handleSubmitInstruccion,
        hasOpciones,
        hasPreguntas,
        hasCampos,
        hasPlaceholder,
        hasType,
        hasInstrucciones,
        isNumeric,
        isBasico,
        isExamen,
        isMultiple,
        getHeading,
        getCountPregunta,
        getCountOpcion,
        getCountOpcionCampo,
        getUltimoId,
        getTipo,
        getCategoria,
        canAddInstrucciones,
    } = useCrearTest();
    
</script>

<template>
    <Spinner v-if="cargando" />
    
    <div v-else>
        <HeadingDashboard>
            {{ getHeading }}
        </HeadingDashboard>

        <AccionesDashboard 
            :opciones="editando ? {name: 'dashboard.tests.index', params: {id: test.id}} : {name: 'dashboard.tests'}"
        >
            Volver
        </AccionesDashboard>
    
        <div class="bg-white shadow rounded px-4 py-6 max-w-4xl mx-auto mt-10">
            <PrimerPagina 
                v-if="page === 1"
                :test="test"
                :selects-categorias="selectsCategorias"
                :selects-tipos="selectsTipos"
                :rules="rules"
                v-model:categoria="test.categoria_id"
                v-model:descripcion-test="test.descripcion"
                v-model:nombre-test="test.nombre"
                @handle-click-siguiente="handleClickSiguiente"
                @resetear-opciones="resetearOpciones"
            />

            <SegundaPagina 
                v-else-if="page === 2" 
                :test="test"
                :preguntas-normales="preguntasNormales"
                :opciones-normales="opcionesNormales"
                :preguntas-extras="preguntasExtras"
                :opciones-extras="opcionesExtras"
                :crear-instrucciones="crearInstrucciones"
                :has-preguntas="hasPreguntas"
                :has-opciones="hasOpciones"
                :has-campos="hasCampos"
                :is-basico="isBasico"
                :is-multiple="isMultiple"
                :is-examen="isExamen"
                :inputs-campos="inputsCampos"
                @handle-click-anterior="handleClickAnterior"
                @handle-click-siguiente="handleClickSiguiente"
                @handle-click-multiple="handleClickMultiple"
                @handle-click-crear-campo="handleClickCrearCampo"
                @handle-click-actualizar-campo="handleClickActualizarCampo"
                @handle-click-eliminar-campo="handleClickEliminarCampo"
                @handle-click-crear-opcion-campo="handleClickCrearOpcionCampo"
                @handle-click-actualizar-opcion-campo="handleClickActualizarOpcionCampo"
                @handle-click-eliminar-opcion-campo="handleClickEliminarOpcionCampo"
                @handle-click-crear-pregunta="handleClickCrearPregunta"
                @handle-click-actualizar-pregunta="handleClickActualizarPregunta"
                @handle-click-eliminar-pregunta="handleClickEliminarPregunta"
                @handle-click-crear-opcion="handleClickCrearOpcion"
                @handle-click-actualizar-opcion="handleClickActualizarOpcion"
                @handle-click-eliminar-opcion="handleClickEliminarOpcion"
            /> 

            <TercerPagina
                v-else-if="page === 3"
                :instrucciones="instrucciones"
                :puntaje-actual="puntajeActual"
                :puntaje-minimo="puntajeMinimo"
                :puntaje-maximo="puntajeMaximo"
                :has-instrucciones="hasInstrucciones"
                :get-ultimo-id="getUltimoId"
                :can-add-instrucciones="canAddInstrucciones"
                @handle-click-anterior="handleClickAnterior"
                @handle-click-siguiente="handleClickSiguiente"
                @handle-click-crear-instruccion="handleClickCrearInstruccion"
                @handle-click-actualizar-instruccion="handleClickActualizarInstruccion"
                @handle-click-eliminar-instruccion="handleClickEliminarInstruccion"
            />
    
            <Preview v-else 
                :test="test"
                :instrucciones="instrucciones"
                :preguntas-normales="preguntasNormales"
                :opciones-normales="opcionesNormales"
                :preguntas-extras="preguntasExtras"
                :get-tipo="getTipo"
                :get-categoria="getCategoria"
                :editando="editando"
                @handle-click-page="handleClickPage"
                @crear-test="crearTest"
                @editar-test="editarTest"
            />
        </div>
    
        <ModalDashboard 
            v-if="modalStore.isModal"
            @quitar-modal="quitarModal"
        >
            <CrearPregunta 
                v-if="modalStore.hasModal === 1.1" 
                :pregunta="pregunta"
                :get-count-pregunta="getCountPregunta"
                :rules="rules"
                @handle-submit-pregunta="handleSubmitPregunta"
            />
    
            <CrearOpcion 
                v-else-if="modalStore.hasModal === 1.2" 
                :opcion="opcion"
                :get-count-opcion="getCountOpcion"
                :is-examen="isExamen"
                :is-number="true"
                :rules="rules"
                @handle-submit-opcion="handleSubmitOpcion"
            />
                
            <CrearCampo 
                v-else-if="modalStore.hasModal === 1.3" 
                :campo="pregunta"
                :has-placeholder="hasPlaceholder"
                :has-type="hasType"
                :is-numeric="isNumeric"
                :selects-campos="selectsCampos"
                :rules="rules"
                @resetear-campo="resetearCampo"
                @handle-submit-campo="handleSubmitCampo"
            />
    
            <CrearOpcion 
                v-else-if="modalStore.hasModal === 1.4"
                :opcion="opcion"
                :get-count-opcion="getCountOpcionCampo"
                :is-examen="false"
                :is-number="false"
                :rules="rules"
                @handle-submit-opcion="handleSubmitOpcionCampo"
            />
    
            <CrearInstruccion 
                v-else
                :instruccion="instruccion"
                :puntaje-actual="puntajeActual"
                :puntaje-maximo="puntajeMaximo"
                :rules="rules"
                @handle-submit-instruccion="handleSubmitInstruccion"
            />
        </ModalDashboard>
    </div>
</template>