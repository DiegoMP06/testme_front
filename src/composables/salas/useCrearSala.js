import { computed, ref, reactive } from "vue";
import { useRouter } from "vue-router";
import { toast } from "vue3-toastify";
import SalaService from "@/services/SalaService";

export default function useCrearSala() {
    const router = useRouter();
    const cargando = ref(false);

    const sala = reactive({
        id: null,
        nombre: '',
        descripcion: '',
        num_alumnos: '',
        num_profesores: '',
        password: '',
        publico: 1,
        acceso: 0,
        user_id: '',
        created_at: '',
        updated_at: '',
    });

    const rules = {
        nombre: {
            required: 'El Nombre es Obligatorio',
            length: 'El Nombre debe Tener Maximo 100 Caracteres'
        },
        descripcion: {
            required: 'La Descripcion Es Obligatoria',
            length: 'La Descripcion debe Tener entre 50 y 1000 Caracteres',
        },
        num_alumnos: {
            required: 'La Cantidad de Alumnos es Obligatoria',
            number: 'La Cantidad de Alumnos es Invalida',
            min: 'La Cantidad de Alumnos debe Ser Mayor o Igual a 1',
            max: 'La Cantidad de Alumnos debe Ser Menor o Igual a 1000'
        },
        num_profesores: {
            number: 'La Cantidad de Profesores es Invalida',
            min: 'La Cantidad de Profesores debe Ser Mayor o Igual a 0',
            max: 'La Cantidad de Profesores debe Ser Menor o Igual a 20'
        },
        publico: {
            required: 'El Estatus es Obligatorio',
            number: 'El Estatus es Invalido',
            min: 'El Estatus es Invalido',
            max: 'El Estatus es Invalido',
        },
        password: {
            required: 'La Clave Es Obligatoria',
            length: 'La Clave Debe Tener Entre 6 y 20 Caracteres',
        }
    };

    function handleSubmit() {
        sala.num_alumnos = parseInt(sala.num_alumnos);
        sala.num_profesores = sala.num_profesores ? parseInt(sala.num_profesores) : 0;
        
        crearSala();
    }

    async function crearSala() {
        cargando.value = true;
        try {
            const {data: {sala: {id}}} = await SalaService.crearSala(sala);

            router.push({name: 'dashboard.salas.index', params: {id}});
        } catch (error) {
            toast.error('No Se Pudo Crear La Sala');
        } finally {
            cargando.value = false;
        }
    }

    const isPrivate = computed(() => {
        return !sala.publico;
    });

    return {
        rules,
        cargando,
        sala,
        handleSubmit,
        isPrivate,
    };
}