import { ref, reactive, computed, onMounted, watch } from "vue";
import {useRouter, useRoute} from 'vue-router'
import { uid } from "uid";
import Swal from 'sweetalert2'
import { toast } from 'vue3-toastify';
import TestService from "@/services/TestService";
import { useModalStore } from "@/stores/modal";
import { watchEffect } from "vue";

export default function useCrearTest() {
    const router = useRouter();
    const route = useRoute();
    const modalStore = useModalStore();
    const page = ref(1);
    const cargando = ref(false);
    const editando = ref(false);
    const campoId = ref(null);
    const crearInstrucciones =  ref(false);
    const puntajeMaximo = ref(0);
    const puntajeMinimo = ref(0);
    const puntajeActual = ref(0);
    const categorias = ref([]);
    const tipos = ref([]);
    const selectsCategorias = ref([]);
    const selectsTipos = ref([]);
    const instrucciones = ref([]);
    const preguntasNormales = ref([]);
    const opcionesNormales = ref([]);
    const preguntasExtras = ref([]);
    const opcionesExtras = ref([]);
    const test = reactive({
        id: null,
        nombre: '',
        descripcion: '',
        respuestas: 0,
        publico: 0,
        categoria_id: '',
        tipo_id: '',
        user_id: '',
        created_at: '',
        updated_at: '',
    });
    const instruccion = reactive({
        id: null,
        token: null,
        titulo: '',
        instruccion: '',
        max: '',
        min: '',
        test_version_id: '',
        created_at: '',
        updated_at: '',
    });
    const pregunta = reactive({
        id: null,
        token: null,
        pregunta: '',
        type: '',
        required: false,
        campo_extra: false,
        extras: {},
        test_version_id: '',
        created_at: '',
        updated_at: '',
    });
    const opcion = reactive({
        id: null,
        token: null,
        opcion: '',
        valor: '',
        test_version_id: '',
        created_at: '',
        updated_at: '',
    });
    const seleccione = {
        label: '-- Seleccione --',
        value: '',
    };
    const inputsCampos = {
        text: 'Campo de Texto',
        textarea: 'Campo de Texto Multilinea',
        number: 'Campo Numerico',
        radio: 'Opciones',
        select: 'Listado de Opciones',
        checkbox: 'Opciones Multiples',
    };
    const selectsCampos = ref([]);
    const rules = {
        nombre: {
            required: 'El Nombre es Obligatorio',
            length: 'En Nombre Debe Tener Maximo 100 Caracteres'
        },
        categoria_id: {
            required: 'La Categoria es Obligatoria',
            number: 'La Categoria No Es Valida'
        },
        tipo_id: {
            required: 'El Tipo de Test es Obligatorio',
            number: 'El Tipo de Test No Es Valido'
        },
        descripcion: {
            required: 'La Descripcion es Obligatoria',
            length: 'La Descripcion Debe Tener Entre 50 y 1000 Caracteres'
        },
        pregunta: {
            required: 'La Pregunta es Obligatoria',
            length: 'La Pregunta Debe Tener Maximo 100 Caracteres'
        },
        opcion: {
            required: 'La Opcion es Obligatoria',
            length: 'La Opcion Debe Tener Maximo 100 Caracteres'
        },
        valor: {
            required: 'El Valor es Obligatorio',
            number: 'El Valor Debe Ser un Numero',
            min: 'El Valor debe ser Mayor o Igual a 1',
            max: 'El Valor debe ser Menor o Igual a 20',
            length: 'El Valor Debe Tener Maximo 80 Caracteres'
        },
        campo: {
                tipo: {
                required: 'El Tipo de Campo es Obligatorio',
            },
            campo: {
                required: 'El Campo es Obligatorio' ,
                length: 'El Campo debe tener Maximo 80 Caracteres'

            },
            placeholder: {
                length: 'El Texto de Guia debe tener Maximo 80 Caracteres'
            },
            min: {
                number: 'Formato No Valido'
            },
            max: {
                number: 'Formato No Valido'
            },
        },
        instruccion: {
            titulo: {
                required: 'El Titulo de la Instruccion es Obligatorio',
                length: 'El Titulo de la Instruccion debe tener Maximo 100 Caracteres'
            },
            max: {
                required: 'El Puntaje Maximo de la Instruccion es Obligatorio',
                max: 'El Puntaje Maximo de la Instruccion es Invalido',
                min: 'El Puntaje Maximo de la Instruccion es Invalido',
            },
            instruccion: {
                required: 'El Contenido de la Instruccion es Obligatorio',
                length: 'El Contenido de la Instruccion debe tener Maximo 1000 Caracteres'
            }
        }
    };
    const calcular = {
        basico() {
            const values = opcionesNormales.value.map(opcion => opcion.valor);

            puntajeMaximo.value = Math.max(...values) * preguntasNormales.value.length;
            puntajeMinimo.value = Math.min(...values) * preguntasNormales.value.length;
        },
        medio() {
            const values = opcionesNormales.value.map(campo => {
                const values = campo.opciones.map(opcion => opcion.valor);

                return {
                    max: Math.max(...values),
                    min: Math.min(...values),
                }
            });

            puntajeMaximo.value = values.reduce((total, valor) => total + valor.max, 0);
            puntajeMinimo.value = values.reduce((total, valor) => total + valor.min, 0);
        },
        avanzado() {
            let multiples = [];
            let basicos = [];

            preguntasNormales.value.map(pregunta => {
                if(pregunta.extras.multiple) {
                    multiples = [...multiples, {...opcionesNormales.value.find(opcion => opcion.pregunta_token === pregunta.token)}];
                    return;
                }

                basicos = [...basicos, {...opcionesNormales.value.find(opcion => opcion.pregunta_token === pregunta.token)}];
            });

            const valuesMultiples = multiples.map(campo => {
                const values = campo.opciones.map(opcion => opcion.valor);
                const max = campo.opciones.reduce((total, opcion) => total + opcion.valor, 0)

                return {
                    max,
                    min: Math.min(...values),
                }
            });

            const valuesBasicos = basicos.map(campo => {
                const values = campo.opciones.map(opcion => opcion.valor);

                return {
                    max: Math.max(...values),
                    min: Math.min(...values),
                }
            });

            puntajeMaximo.value = valuesMultiples.reduce((total, valor) => total + valor.max, 0) + valuesBasicos.reduce((total, valor) => total + valor.max, 0);
            puntajeMinimo.value = valuesMultiples.reduce((total, valor) => total + valor.min, 0) + valuesBasicos.reduce((total, valor) => total + valor.min, 0);
        },
        examen() {
            puntajeMinimo.value = 1;
            puntajeMaximo.value = 100;
        },
    }
    function formatearTest() {
        let campos = [];
        let camposExtra = [];

        if(test.tipo_id !== 1) {
            campos = preguntasNormales.value.map(pregunta => {
                const {opciones} = opcionesNormales.value.find(campo => campo.pregunta_token === pregunta.token);

                return {
                    pregunta,
                    opciones,
                }
            });
        } else {
            campos = {
                preguntas: preguntasNormales.value,
                opciones: opcionesNormales.value,
            };
        }

        camposExtra = preguntasExtras.value.map(pregunta => {
            if(pregunta.type === 'radio' || pregunta.type === 'checkbox' || pregunta.type === 'select') {
                const {opciones} = opcionesExtras.value.find(campo => campo.pregunta_token === pregunta.token);
                return {pregunta, opciones}
            }

            return {pregunta};
        });

        return {
            nombre: test.nombre,
            descripcion: test.descripcion,
            categoria_id: test.categoria_id,
            tipo_id: test.tipo_id,
            campos,
            camposExtra,
            instrucciones:  instrucciones.value,
        };
    }
    async function editarTest() {
        cargando.value = true;
        const datos = formatearTest();

        try {
            await TestService.editar(test.id, datos);
            router.push({name: 'dashboard.tests.index', params: {id: test.id}})
        } catch (error) {
            toast.error('No Se Pudo Actualizar El Test');
        } finally {
            cargando.value = false;
        }
    }
    async function crearTest() {
        cargando.value = true;
        const datos = formatearTest();

        try {
            const {data: {test}} = await TestService.crear(datos);

            router.push({name: 'dashboard.tests.index', params: {id: test.id}})
        } catch (error) {
            toast.error('No Se Pudo Crear El Test');
        } finally {
            cargando.value = false;
        }
    }
    watch(page, () => {
        if(page.value === 3) {
            calcularPuntaje();
        }
    });
    watchEffect(() => {
        crearInstrucciones.value = false;

        if(preguntasNormales.value.length < 5) {
            return;
        }

        if(test.tipo_id === 1 && opcionesNormales.value.length < 2) {
            return;
        }

        if(test.tipo_id !== 1) {
            for(let opcion of opcionesNormales.value) {
                if(opcion.opciones.length < 2) {
                    return;
                }
            }
        }

        if(test.tipo_id === 4) {
            for(let campo of opcionesNormales.value) {
                const values = campo.opciones.map(opcion => opcion.valor);

                if(!values.includes(true)) {
                    return;
                }
            }
        }

        for(let opcion of opcionesExtras.value) {
            if(opcion.opciones.length < 2) {
                return;
            }
        }

        crearInstrucciones.value =  true;
    });
    onMounted(async () => {
        selectsCampos.value = [{...seleccione}]
        Object.entries(inputsCampos).forEach(([value, label]) => selectsCampos.value = [...selectsCampos.value, {label, value}]);

        if(route.name === 'dashboard.tests.editar') {
            obtenerDatosEditar();
        } else {
            obtenerDatosCrear();
        }
    });
    async function obtenerDatosCrear() {
        cargando.value = true;
        
        try {
            
            const [dataCategorias, dataTipos] = await Promise.all([
                TestService.obtenerCategorias(),
                TestService.obtenerTipos(),
            ]);

            categorias.value = dataCategorias.data.data;
            tipos.value = dataTipos.data.data;

            setSelects();
        } catch (error) {
            toast.error('Ha Ocurrido Un Error Al Consultar los Datos');
        } finally {
            cargando.value = false;
        }
    }
    async function obtenerDatosEditar() {
        cargando.value = true;
        editando.value = true;
        page.value = 4;

        try {
            const [dataCategorias, dataTipos, dataTest] = await Promise.all([
                TestService.obtenerCategorias(),
                TestService.obtenerTipos(),
                TestService.obtenerTestEditar(route.params.id)
            ]);

            categorias.value = dataCategorias.data.data;
            tipos.value = dataTipos.data.data;

            const {data: {data: [data]}} = dataTest;

            test.id = data.id;
            test.nombre = data.version[0].nombre;
            test.descripcion = data.version[0].descripcion;
            test.publico = data.version[0].publico;
            test.respuestas = data.version[0].respuestas;
            test.categoria_id = data.version[0].categoria_id;
            test.tipo_id = data.version[0].tipo_id;
            test.created_at = data.version[0].created_at;
            test.updated_at = data.version[0].updated_at;
            test.user_id = data.user_id;

            instrucciones.value = data.version[0].instrucciones;

            if(test.tipo_id === 1) {
                opcionesNormales.value = data.version[0].campos[0].opciones.map(({id, token, opcion, valor, test_version_id, created_at, updated_at}) => {
                    return {
                        id,
                        token,
                        opcion,
                        valor: Number(valor),
                        test_version_id,
                        created_at,
                        updated_at,
                    }
                });;
            }

            data.version[0].campos.forEach(({id, token, pregunta, type, required, extras, campo_extra, test_version_id, created_at, updated_at, opciones}) => {
                preguntasNormales.value = [...preguntasNormales.value, {
                    id,
                    token,
                    pregunta,
                    type,
                    required,
                    campo_extra,
                    extras,
                    test_version_id,
                    created_at,
                    updated_at,
                }];

                if(test.tipo_id !== 1) {
                    opcionesNormales.value = [...opcionesNormales.value, {
                        id: uid(),
                        pregunta_token: token,
                        opciones: opciones.map(({id, token, opcion, valor, test_version_id, created_at, updated_at}) => {
                            return {
                                id,
                                token,
                                opcion,
                                valor: test.tipo_id === 4 ? Number(valor) ? true :  false : Number(valor),
                                test_version_id,
                                created_at,
                                updated_at,
                            }
                        }),
                    }];
                }
            });

            data.version[0].camposExtra.forEach(({id, token, pregunta, type, required, extras, campo_extra, test_version_id, created_at, updated_at, opciones}) => {
                preguntasExtras.value = [...preguntasExtras.value, {
                    id,
                    token,
                    pregunta,
                    type,
                    required,
                    campo_extra,
                    extras,
                    test_version_id,
                    created_at,
                    updated_at,
                }];

                if(type === 'radio' || type === 'select' || type === 'checkbox') {
                    opcionesExtras.value = [...opcionesExtras.value, {
                        id: uid(),
                        pregunta_token: token,
                        opciones,
                    }];
                }
            });
            
            setSelects();
        } catch (error) {
            if(error?.response?.status === 404 || error?.response?.status === 403) {
                router.push({name: 'dashboard.tests'})
            } else {
                toast.error('Ha Ocurrido Un Error Al Consultar los Datos');
            }
        } finally {
            cargando.value = false;
        }
    }
    function setSelects() {
        selectsCategorias.value = [{ ...seleccione }];
        selectsTipos.value = [{ ...seleccione }];

        categorias.value.forEach(({ id: value, categoria: label }) => selectsCategorias.value = [...selectsCategorias.value, {label, value}]);
        tipos.value.forEach(({ id: value, tipo: label }) => selectsTipos.value = [...selectsTipos.value, {label, value}]);
    }
    function calcularPuntaje() {
        const tipo = tipos.value.find(tipo => tipo.id === test.tipo_id).tipo.toLowerCase();

        calcular[tipo]();

        if(instrucciones.value.length > 0) {
            instrucciones.value = instrucciones.value.filter(instruccion => instruccion.max <= puntajeMaximo.value);
            puntajeActual.value = instrucciones.value[instrucciones.value.length - 1].max + 1;
        } else {
            puntajeActual.value = puntajeMinimo.value;
        }
    }
    function quitarModal() {
        Object.assign(instruccion, {
            id: null,
            token: null,
            titulo: '',
            instruccion: '',
            max: '',
            min: '',
            test_version_id: '',
            created_at: '',
            updated_at: '',
        });

        Object.assign(pregunta, {
            id: null,
            token: null,
            pregunta: '',
            type: '',
            required: false,
            campo_extra: false,
            extras: {},
            test_version_id: '',
            created_at: '',
            updated_at: '',
        });

        Object.assign(opcion, {
            id: null,
            token: null,
            opcion: '',
            valor: '',
            test_version_id: '',
            created_at: '',
            updated_at: '',
        });

        setTimeout(() => {
            campoId.value = null;
        }, 301);

        modalStore.handleClickQuitar();
    }
    function resetearOpciones(value) {
        opcionesNormales.value = [];
        preguntasNormales.value = [];
        instrucciones.value = [];
        
        test.tipo_id = value;
    }
    function resetearCampo(type) {
        Object.assign(pregunta, {
            type,
            extras: {},
        });
    }
    function crearCampo() {
        pregunta.campo_extra = true;
        pregunta.token = uid();

        if(pregunta.type === 'radio' || pregunta.type === 'checkbox' || pregunta.type === 'select') {
            opcionesExtras.value = [...opcionesExtras.value, {
                id: uid(),
                pregunta_token: pregunta.token,
                opciones: [],
            }];
        }

        preguntasExtras.value = [...preguntasExtras.value, {...pregunta}]
        
        quitarModal();
        toast.success('Campo Creado Correctamente')
    }
    function editarCampo() {
        const campo = opcionesExtras.value.find(campo => campo.pregunta_token === pregunta.token);
    
        if(!campo && (pregunta.type === 'radio' || pregunta.type === 'checkbox' || pregunta.type === 'select')) {
            opcionesExtras.value = [...opcionesExtras.value, {
                id: uid(),
                pregunta_token: pregunta.token,
                opciones: [],
            }];
        }

        preguntasExtras.value = preguntasExtras.value.map(preguntaState => preguntaState.token === pregunta.token ? {...pregunta} : preguntaState);
        
        quitarModal();
        toast.success('Campo Editada Correctamente')
    }
    function eliminarCampo(token) {
        const pregunta = preguntasExtras.value.find(pregunta => pregunta.token === token);

        if(pregunta.type === 'radio' || pregunta.type === 'checkbox' || pregunta.type === 'select') {
            opcionesExtras.value = opcionesExtras.value.filter(opcion => opcion.pregunta_token !== pregunta.token);
        }

        preguntasExtras.value = preguntasExtras.value.filter(pregunta => pregunta.token !== token);

        Swal.fire({
            title: "Eliminado",
            text: "El Campo Se Elimino.",
            icon: "success"
        });
    }
    function crearOpcionCampo() {
        const campo = {...opcionesExtras.value.find(campo => campo.id === campoId.value)};
        campo.opciones = [...campo.opciones, {...opcion, token: uid()}];
        opcionesExtras.value = opcionesExtras.value.map(campoState => campoState.id === campo.id ? campo : campoState);
        
        quitarModal();
        toast.success('Opcion Creada Correctamente')
    }
    function editarOpcionCampo() {
        const campo = {...opcionesExtras.value.find(campo => campo.id === campoId.value)};
        campo.opciones = campo.opciones.map(opcionState => opcionState.token === opcion.token ? {...opcion} : opcionState);
        opcionesExtras.value = opcionesExtras.value.map(campoState => campoState.id === campo.id ? campo : campoState);

        quitarModal();
        toast.success('Opcion Editada Correctamente')
    }
    function eliminarOpcionCampo(token, campoId) {
        const campo = {...opcionesExtras.value.find(campo => campo.id === campoId)};
        campo.opciones = campo.opciones.filter(opcion => opcion.token !== token);
        opcionesExtras.value = opcionesExtras.value.map(campoState => campoState.id === campo.id ? campo : campoState);

        Swal.fire({
            title: "Eliminado",
            text: "La Opcion Se Elimino.",
            icon: "success"
        });
    }
    function crearPregunta() {
        const token = uid();

        pregunta.token = token;
        pregunta.campo_extra = false;
        pregunta.required = true,
        pregunta.type = 'radio';

        if(test.tipo_id === 4 || test.tipo_id === 3) pregunta.extras.multiple = false;

        preguntasNormales.value = [...preguntasNormales.value, {...pregunta}];

        if(test.tipo_id !== 1) {
            opcionesNormales.value = [...opcionesNormales.value, {
                id: uid(),
                pregunta_token: token,
                opciones: [],
            }];
        }

        quitarModal();
        toast.success('Pregunta Creada Correctamente')
    }
    function editarPregunta() {
        preguntasNormales.value = preguntasNormales.value.map(preguntaState => preguntaState.token === pregunta.token ? {...pregunta} : preguntaState);

        quitarModal();
        toast.success('Pregunta Editada Correctamente')
    }
    function eliminarPregunta(token) {
        preguntasNormales.value = preguntasNormales.value.filter(pregunta => pregunta.token !== token);

        if(test.tipo_id !== 1) {
            opcionesNormales.value = opcionesNormales.value.filter(opcion => opcion.pregunta_token !== token);
        }

        Swal.fire({
            title: "Eliminado",
            text: "La Pregunta Se Elimino.",
            icon: "success"
        });
    }
    function crearOpcion() {
        if(test.tipo_id === 4) {
            opcion.valor = false;
        }

        if(test.tipo_id === 1) {
            opcionesNormales.value = [...opcionesNormales.value, {...opcion, token: uid()}];
        } else {
            const campo = {...opcionesNormales.value.find(campo => campo.id === campoId.value)};
            campo.opciones = [...campo.opciones, {...opcion, token: uid()}];
            opcionesNormales.value = opcionesNormales.value.map(campoState => campoState.id === campo.id ? campo : campoState);
        }
        
        quitarModal();
        toast.success('Opcion Creada Correctamente');
    }
    function editarOpcion() {
        if(test.tipo_id === 1) {
            opcionesNormales.value = opcionesNormales.value.map(opcionState => opcionState.token === opcion.token ? {...opcion} : opcionState);
        } else {
            const campo = {...opcionesNormales.value.find(campo => campo.id === campoId.value)};
            campo.opciones = campo.opciones.map(opcionState => opcionState.token === opcion.token ? {...opcion} : opcionState);
            opcionesNormales.value = opcionesNormales.value.map(campoState => campoState.id === campo.id ? campo : campoState);
        }

        quitarModal();
        toast.success('Opcion Editada Correctamente')
    }
    function eliminarOpcion(token, campoId) {
        if(test.tipo_id === 1) {
            opcionesNormales.value = opcionesNormales.value.filter(opcion => opcion.token !== token);
        } else {
            const campo = {...opcionesNormales.value.find(campo => campo.id === campoId)};
            campo.opciones = campo.opciones.filter(opcion => opcion.token !== token);
            opcionesNormales.value = opcionesNormales.value.map(campoState => campoState.id === campo.id ? campo : campoState);
        }

        Swal.fire({
            title: "Eliminado",
            text: "La Opcion Se Elimino.",
            icon: "success"
        });
    }
    function crearInstruccion() {
        instruccion.min = puntajeActual.value;
        puntajeActual.value = instruccion.max + 1;
        
        instrucciones.value = [...instrucciones.value, {...instruccion, token: uid()}];

        quitarModal();
        toast.success('Instruccion Creada Correctamente');
    }
    function editarInstruccion() {
        instrucciones.value = instrucciones.value.map(instruccionState => instruccionState.token === instruccion.token ? {...instruccion} : instruccionState);
        
        quitarModal();
        toast.success('Instruccion Editada Correctamente')
    }
    function eliminarInstruccion() {
        const instruccion = instrucciones.value.pop();
        puntajeActual.value = instruccion.min;

        Swal.fire({
            title: "Eliminado",
            text: "La Instruccion Se Elimino.",
            icon: "success"
        });
    }
    function handleClickAnterior() {
        page.value--;
    }
    function handleClickSiguiente() {
        page.value++;
    }
    function handleSubmitCampo() {
        if(pregunta.type === 'text' || pregunta.type === 'textarea' || pregunta.type === 'number') {
            pregunta.extras.placeholder = pregunta.extras.placeholder ?? '';
            
            opcionesExtras.value = opcionesExtras.value.filter(opcion => opcion.pregunta_token !== pregunta.token);
        }

        if(pregunta.type === 'number') { 
            pregunta.extras.min = pregunta.extras.min ? Number(pregunta.extras.min) : '';
            pregunta.extras.max = pregunta.extras.max ? Number(pregunta.extras.max) : '';
            pregunta.extras.int = pregunta.extras.int ?? false;
        }

        if(pregunta.token) {
            editarCampo();
            return;
        }

        crearCampo();
    }
    function handleClickCrearCampo() {
        modalStore.handleClickMostrarModal(1.3);
    }
    function handleClickActualizarCampo(token) {
        Object.assign(pregunta, {...preguntasExtras.value.find(pregunta => pregunta.token === token)});

        modalStore.editando = true;
        modalStore.handleClickMostrarModal(1.3);
    }
    function handleClickEliminarCampo(token) {
        Swal.fire({
            title: "Atencion",
            text: "¿Deseas Eliminar el Campo?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Si",
            cancelButtonText: 'No',
        }).then((result) => {
            if (result.isConfirmed) {
                eliminarCampo(token);
            }
        });
    }
    function handleSubmitOpcionCampo() {
        opcion.valor = isNaN(opcion.valor) ? opcion.valor : Number(opcion.valor);

        if(opcion.token) {
            editarOpcionCampo();
            return;
        }

        crearOpcionCampo();
    }
    function handleClickCrearOpcionCampo(campo_id) {
        campoId.value = campo_id ?? null;
        
        modalStore.handleClickMostrarModal(1.4);
    }
    function handleClickActualizarOpcionCampo([token, campo_id]) {
        campoId.value =  campo_id;

        const campo = opcionesExtras.value.find(campo => campo.id === campoId.value);
        Object.assign(opcion, {...campo.opciones.find(opcionState => opcionState.token === token)});

        modalStore.editando = true;
        modalStore.handleClickMostrarModal(1.4);
    }
    function handleClickEliminarOpcionCampo([token, campoId]) {
        Swal.fire({
            title: "Atencion",
            text: "¿Deseas Eliminar la Opcion?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Si",
            cancelButtonText: 'No',
        }).then((result) => {
            if (result.isConfirmed) {
                eliminarOpcionCampo(token, campoId);
            }
        });
    }
    function handleSubmitPregunta() {
        if(pregunta.token) {
            editarPregunta();
            return;
        }

        crearPregunta();
    }
    function handleClickCrearPregunta() {
        modalStore.handleClickMostrarModal(1.1);
    }
    function handleClickActualizarPregunta(token) {
        Object.assign(pregunta, {...preguntasNormales.value.find(pregunta => pregunta.token === token)});
        
        modalStore.editando = true;
        modalStore.handleClickMostrarModal(1.1);
    }
    function handleClickEliminarPregunta(token) {
        Swal.fire({
            title: "Atencion",
            text: "¿Deseas Eliminar la Pregunta?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Si",
            cancelButtonText: 'No',
        }).then((result) => {
            if (result.isConfirmed) {
                eliminarPregunta(token);
            }
        });
    }
    function handleSubmitOpcion() {
        opcion.valor = parseInt(opcion.valor);

        if(opcion.token) {
            editarOpcion();
            return;
        }

        crearOpcion();
    }
    function handleClickCrearOpcion(campo_Id) {
        campoId.value = campo_Id ?? null;

        modalStore.handleClickMostrarModal(1.2);
    }
    function handleClickActualizarOpcion([token, campo_id]) {
        if(test.tipo_id === 1) {
            Object.assign(opcion, {...opcionesNormales.value.find(opcionState => opcionState.token === token)});
        } else {
            campoId.value = campo_id;
            const campo = opcionesNormales.value.find(campo => campo.id === campoId.value);
            Object.assign(opcion, {...campo.opciones.find(opcionState => opcionState.token === token)});
        }

        modalStore.editando = true;
        modalStore.handleClickMostrarModal(1.2);
    }
    function handleClickEliminarOpcion([token, campoId]) {
        Swal.fire({
            title: "Atencion",
            text: "¿Deseas Eliminar la Opcion?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Si",
            cancelButtonText: 'No',
        }).then((result) => {
            if (result.isConfirmed) {
                eliminarOpcion(token, campoId);
            }
        });
    }
    function handleSubmitInstruccion() {
        instruccion.max = parseInt(instruccion.max);

        if(instruccion.token) {
            editarInstruccion();
            return;
        }

        crearInstruccion();
    }
    function handleClickCrearInstruccion() {
        modalStore.handleClickMostrarModal(1.5);
    }
    function handleClickActualizarInstruccion(token) {
        Object.assign(instruccion, {...instrucciones.value.find(instruccion => instruccion.token === token)});

        modalStore.editando = true;
        modalStore.handleClickMostrarModal(1.5);
    }
    function handleClickEliminarInstruccion() {
        Swal.fire({
            title: "Atencion",
            text: "¿Deseas Eliminar la Instruccion?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Si",
            cancelButtonText: 'No',
        }).then((result) => {
            if (result.isConfirmed) {
                eliminarInstruccion();
            }
        });
    }
    function handleClickPage(pagina) {
        page.value = pagina;
    }
    function handleClickMultiple({pregunta_token = '', multiple = false}) {
        const pregunta = {...preguntasNormales.value.find(pregunta => pregunta.token === pregunta_token)};
        
        pregunta.type = multiple ? 'checkbox' : 'radio';
        pregunta.extras.multiple = multiple;

        preguntasNormales.value = preguntasNormales.value.map(preguntaState => preguntaState.token === pregunta.token ? pregunta : preguntaState);
    }
    const getHeading = computed(() => editando.value ? `Editar Test` : 'Crear Test');
    const getCategoria = computed(() => { return {...categorias.value.find(categoria => categoria.id === test.categoria_id)}});
    const getTipo = computed(() => { return {...tipos.value.find(tipo => tipo.id === test.tipo_id)}});
    const getCountPregunta = computed(() => {
        if(modalStore.editando) {
            return preguntasNormales.value.findIndex(preguntaState => pregunta.token === preguntaState.token) + 1;
        }
        
        return preguntasNormales.value.length + 1;
    });
    const getCountOpcionCampo = computed(() => {
        if(modalStore.editando) {
            const campo = {...opcionesExtras.value.find(campoState => campoState.id === campoId.value)}; 
            return campo.opciones.findIndex(opcionState => opcionState.token === opcion.token) + 1;
        }

        const campo = {...opcionesExtras.value.find(campoState => campoState.id === campoId.value)};
        return campo?.opciones?.length + 1;
    });
    const getCountOpcion = computed(() => {
        if(modalStore.editando) {
            if(test.tipo_id === 1) return opcionesNormales.value.findIndex(opcionState => opcion.token === opcionState.token) + 1;

            const campo = {...opcionesNormales.value.find(campoState => campoState.id === campoId.value)}; 
            return campo.opciones.findIndex(opcionState => opcionState.token === opcion.token) + 1;
        }

        if(test.tipo_id === 1) return opcionesNormales.value.length + 1;

        const campo = {...opcionesNormales.value.find(campoState => campoState.id === campoId.value)};
        return campo?.opciones?.length + 1;
    });
    const getUltimoId = computed(() => instrucciones.value[instrucciones.value.length - 1]?.token);
    const hasCampos = computed(() => preguntasExtras.value.length > 0);
    const hasPreguntas = computed(() => preguntasNormales.value.length > 0);
    const hasOpciones = computed(() => opcionesNormales.value.length > 0);
    const hasInstrucciones = computed(() => instrucciones.value.length > 0);
    const hasPlaceholder = computed(() => pregunta.type === 'text' || pregunta.type === 'textarea' || pregunta.type === 'number');
    const hasType = computed(() => pregunta.type);
    const isBasico = computed(() => test.tipo_id === 1);
    const isExamen = computed(() => test.tipo_id === 4);
    const isMultiple = computed(() => test.tipo_id === 3 || test.tipo_id === 4);
    const isNumeric = computed(() => pregunta.type === 'number');
    const canAddInstrucciones = computed(() => puntajeActual.value <= puntajeMaximo.value);

    return {
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
        handleClickPage,
        handleClickAnterior,
        handleClickSiguiente,
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
    };
}