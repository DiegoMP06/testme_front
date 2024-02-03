import { ref, reactive, onMounted, computed } from "vue";
import { useRoute, useRouter } from "vue-router";
import { toast } from 'vue3-toastify';
import EduService from "@/services/EduService";
import { useAuthStore } from "@/stores/auth";

export default function useEduTest() {
    const route = useRoute();
    const router = useRouter();
    const authStore = useAuthStore();

    const cargando = ref(false);
    const page = ref(1);
    const valores = ref([]);

    const visita = reactive({
        id: null,
        respuestas: [],
        puntuacion: 0,
        total: 0,
        test_version_id: '',
        user_id: '',
    });

    const test = reactive({
        id: null,
        nombre: '',
        descripcion: '',
        publico: 0,
        respuestas: 0,
        version: '',
        categoria_id: '',
        tipo_id: '',
        created_at: '',
        updated_at: '',
        categoria: {},
        tipo: {},
        user: {},
        instrucciones: [],
        campos: [],
        camposExtra: [],
    });

    const calcularDatos = {
        basico() {
            visita.puntuacion = valores.value.reduce((total, valor) => valor + total, 0);
            visita.total = (Math.max(...test.campos[0].opciones.map(opcion => parseInt(opcion.valor))) * test.campos.length);
        },
        medio() {
            visita.puntuacion = valores.value.reduce((total, valor) => valor + total, 0);
            const values = test.campos.map(campo => Math.max(...campo.opciones.map(opcion => parseInt(opcion.valor))));
            visita.total = values.reduce((total, valor) => total + valor, 0);
        },
        avanzado() {
            visita.puntuacion = valores.value.reduce((total, valor) => valor + total, 0);

            const values = test.campos.map(campo => {
                const values = campo.opciones.map(opcion => parseInt(opcion.valor));
                if(campo.type === 'radio') return Math.max(...values);
                return values.reduce((total, valor) => total + valor, 0);
            });

            visita.total = values.reduce((total, valor) => total + valor, 0);
        },
        examen() {
            const aciertos = valores.value.reduce((total, valor) => valor + total, 0);
            visita.puntuacion = Number(((aciertos * 100) / test.campos.length).toFixed(2));
            visita.total = 100;
        }
    };

    const obtenerDatos = {
        basico({valor = '', campo = {}}) {
            const valorOpcion = parseInt(campo.opciones.find(opcion => opcion.id === valor).valor);

            visita.respuestas = [...visita.respuestas, {
                valor: valorOpcion,
                pregunta_id: campo.id,
                opciones_ids: [valor],
            }];

            valores.value = [...valores.value, valorOpcion];
        },
        medio({valor = '', campo = {}}) {
            this.basico({valor, campo});
        },
        avanzado({valor = '', campo = {}}) {
            if(campo.type === 'radio') {
                this.basico({valor, campo});
                return;
            }

            const valoresOpciones = valor.map(opcionId => parseInt(campo.opciones.find(opcionState => opcionState.id === opcionId).valor));

            visita.respuestas = [...visita.respuestas, {
                valor: valoresOpciones.reduce((total, valor) => total + valor, 0),
                pregunta_id: campo.id,
                opciones_ids: [...valor],
            }];

            valores.value = [...valores.value, ...valoresOpciones];
        },
        examen({valor = '', campo = {}}) {
            if(campo.type === 'radio') {
                this.basico({valor, campo});
                return;
            }

            const valoresOpciones = valor.map(opcionId => parseInt(campo.opciones.find(opcionState => opcionState.id === opcionId).valor));
            const cantidadCorrectas = campo.opciones.filter(opcion => parseInt(opcion.valor)).length; // a
            const cantidadIncorrectas = campo.opciones.filter(opcion => !parseInt(opcion.valor)).length; // b
            const correctas = valoresOpciones.filter(respuesta => respuesta).length; // c
            const incorrectas = valoresOpciones.filter(respuesta => !respuesta).length;  // d

            // c/a - ((c/a) * (d/b))
            const valorOpcion = (correctas / cantidadCorrectas - ((correctas / cantidadCorrectas) * (incorrectas / cantidadIncorrectas)));

            visita.respuestas = [...visita.respuestas, {
                valor: valorOpcion,
                pregunta_id: campo.id,
                opciones_ids: [...valor],
            }];

            valores.value = [...valores.value, valorOpcion];
        }
    };

    onMounted(() => {
        cargando.value = true;

        EduService.obtenerTest(route.params.id)
            .then(({data: {data: [data]}}) => {
                Object.assign(test, data);

                if(data.visita) {
                    page.value = 2;

                    Object.assign(visita, data.visita[0]);
                }
            })
            .catch(error => {
                if(error?.response?.status === 404 || error?.response?.status === 403) {
                    router.push({name: 'home.tests'})
                } else {
                    toast.error('Ha Ocurrido Un Error al Obtener Los Datos');
                }
            })
            .finally(() => cargando.value = false);
    });

    async function registrarVisita() {
        try {
            cargando.value = true;
            const {data} = await EduService.registrarVisita(test.id, visita);

            Object.assign(visita, data.visita) ;
            page.value = 2;
        } catch (error) {
            toast.error('No Se Pudo Realizar La Solicitud');
        } finally {
            cargando.value = false;
        }
    }

    function handleClickSubmit(data) {

        test.camposExtra.forEach(campo => {
            const valor = data[campo.id] ?? '';

            if(campo.type === 'text' || campo.type == 'textarea' || campo.type === 'number') {
                visita.respuestas = [...visita.respuestas, {
                    valor,
                    pregunta_id: campo.id,
                    opciones_ids: [],
                }];

                return;
            } else if(campo.type === 'checkbox') {
                const valores = valor.map(opcionId => campo.opciones.find(opcionState => opcionState.id === opcionId).valor);

                visita.respuestas = [...visita.respuestas, {
                    valor: valores.length > 0 ? JSON.stringify(valores) : '',
                    pregunta_id: campo.id,
                    opciones_ids: [...valor],
                }];
                return;
            }

            const opcion = campo.opciones.find(opcion => opcion.id === valor);

            visita.respuestas = [...visita.respuestas, {
                valor: opcion ? opcion.valor : '',
                pregunta_id: campo.id,
                opciones_ids: opcion ? [opcion.id] : [],
            }];
        });

        const tipo = test.tipo.tipo.toLowerCase();

        test.campos.forEach(campo => {
            const valor = data[campo.id] ?? '';

            obtenerDatos[tipo]({valor, campo})
        });

        calcularDatos[tipo]();
        registrarVisita();
    }

    const isCreador = computed(() => {
        return test.user.id === authStore.user.id;
    });

    const getInstruccion = computed(() => {
        return {...test.instrucciones.find(instruccion => instruccion.min <= visita.puntuacion && instruccion.max >= visita.puntuacion)};
    });

    return {
        page,
        cargando,
        handleClickSubmit,
        test,
        visita,
        isCreador,
        getInstruccion,
    };
}