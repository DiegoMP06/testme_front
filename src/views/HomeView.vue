<script setup>
    import { useAuthStore } from '@/stores/auth';
    import Header from '@/components/header/Header.vue';
    import Nosotros from '@/assets/nosotros.png';
    import Sala from '@/assets/sala.png';
    import TestPsico from '@/assets/testpsico.jpg';
    import Matematico from '@/assets/matematico.png';
    import Grafica from '@/assets/grafica.png';
    import imagen from '@/assets/pensando.png';
    import EnlaceDesktop from '@/components/header/EnlaceDesktop.vue';
    import { enlaces, enlacesDashboard, enlacesUser } from '@/helpers';

    const authStore = useAuthStore();
</script>

<template>
    <Header/>

    <section class="relative hero">
        <div class="absolute top-0 bottom-0 left-0 right-0 hero__container flex">
            <div class="container px-4 mx-auto mt-24 flex flex-col justify-evenly md:justify-center flex-1 gap-4">
                <h1 class="text-4xl md:text-6xl font-bold text-white text-center md:text-left">TestMe</h1>

                <p class="text-center md:text-left p-4 bg-teal-800 text-white font-bold text-xl md:text-2xl md:max-w-xl">Los Mejores Tests Educativos Creados por la Comunidad</p>
            </div>
        </div>
    </section>

    <section class="bg-teal-800">
        <div class="px-4 py-8 container mx-auto">
            <h2 class="text-2xl font-extrabold text-white">Sobre Nosotros</h2>

            <p class="text-white font-semibold my-6">Hola, somos alumnos del Cbtis No. 211, creemos que los exámenes son un gran trabajo y se gasta mucho tiempo que se puede ahorrar, y que con las nuevas tecnologías se puede facilitar a los docentes creando tests, exámenes, y salas para sus alumnos.</p>

            <div class="flex flex-col md:flex-row gap-4 mt-4 md:items-center">
                <img 
                    loading="lazy"
                    width="100"
                    height="100"
                    class="md:w-1/2"
                    :src="Nosotros" 
                    alt="Imagen Del Primer Bloque Nosotros"
                />

                <div class="flex-1">
                    
                    <p class="text-white font-semibold my-2">Con la contingencia del Covid-19, nos tuvimos que adaptar y utilizar tecnologías como la web, conforme a esto decidimos crear TestMe. Una plataforma donde se pueden crear encuestas a alumnado de una institución sin necesidad de gastar papel, invertir mucho tiempo y esfuerzo, está siendo una página web.</p>
                    <p class="text-white font-semibold my-2">También durante la pandemia, hubo trastornos mentales causados por el encierro, por esto decidimos crear tests psicológicos con ayuda de nuestros psicólogos de la institución, luego los aplicamos en la comunidad estudiantil y brindaremos ayuda más rápido.</p>
                </div>
            </div>
        </div>
    </section>

    <main class="px-4 py-8 container mx-auto">
        <h2 class="text-2xl font-extrabold text-teal-800">Servicios</h2>

        <p class="text-lg font-bold text-slate-700 mt-6">
            Contamos con muchos servicios para mejorar la experiencia del usuario y también para la meta de este proyecto por esto aqui unos de nuestros servicios:
        </p>
        
        <div class="mt-10 grid gap-6">
            <div class="bg-white p-4 rounded shadow flex flex-col md:flex-row gap-4 md:items-center">
                <img 
                    loading="lazy"
                    width="100"
                    height="100"
                    :src="Sala" 
                    alt="Imagen Salas Virtuales"
                    class="md:w-1/2"
                />
    
                <div class="flex-1 flex gap-4 flex-col">
                    <h3 class="text-xl font-extrabold text-teal-800">Salas Virtuales:</h3>
    
                    <p class="text-slate-700 font-semibold">El Profesor puede crear salas para compartir con sus alumnos y añadir profesores de respaldo, en estas salas se pueden subir tests, y que los alumnos los contesten.</p>
                </div>
            </div>

            <div class="bg-white p-4 rounded shadow flex flex-col md:flex-row-reverse gap-4 md:items-center">
                <img 
                    loading="lazy"
                    width="100"
                    height="100"
                    :src="TestPsico" 
                    alt="Imagen Tests Psicologicos"
                    class="md:w-1/2"
                />
    
                <div class="flex-1 flex gap-4 flex-col">
                    <h3 class="text-xl font-extrabold text-teal-800">Tests Psicologicos:</h3>
    
                    <p class="text-slate-700 font-semibold">Esta herramienta no solo se creó para tests educativos, sino también para hacer un buen uso de la psicología y otros campos, este siendo uno de los motivos por lo que se creó Testme.</p>
                </div>
            </div>

            <div class="bg-white p-4 rounded shadow flex flex-col md:flex-row gap-4 md:items-center">
                <img 
                    loading="lazy"
                    width="100"
                    height="100"
                    :src="Matematico"
                    alt="Imagen Matematico"
                    class="md:w-1/2"
                />
    
                <div class="flex-1 flex gap-4 flex-col">
                    <h3 class="text-xl font-extrabold text-teal-800">Cálculo Matemático:</h3>
    
                    <p class="text-slate-700 font-semibold">Estar haciendo cálculos es muy molesto, por lo cual esta herramienta se optimizó para exámenes y tests con escala de Likert, así el profesor obtendrá el mayor provecho de esta herramienta.</p>
                </div>
            </div>

            <div class="bg-white p-4 rounded shadow flex flex-col md:flex-row-reverse gap-4 md:items-center">
                <img 
                    loading="lazy"
                    width="100"
                    height="100"
                    :src="Grafica" 
                    alt="Imagen Salas Virtuales"
                    class="md:w-1/2"
                />
    
                <div class="flex-1 flex gap-4 flex-col">
                    <h3 class="text-xl font-extrabold text-teal-800">Resultados Estadísticos:</h3>
    
                    <p class="text-slate-700 font-semibold">Esta herramienta también puede dar los resultados de sus alumnos en gráficas haciendo una interfaz clara y simple.</p>
                </div>
            </div>
        </div>
    </main>

    <section class="bg-emerald-800">
        <div class="px-4 py-8 container mx-auto">
            <div v-if="authStore.isAuth">
                <p class="text-xl font-bold text-white">¿Ya quieres empezar a contestar Tests?</p>

                <div class="flex gap-2 items-center justify-center mt-6">
                    <RouterLink class="block bg-white hover:bg-slate-100 text-teal-800 font-bold px-4 py-2" :to="{name: 'home.tests'}">
                        Ver Tests
                    </RouterLink>
                    <RouterLink class="block bg-teal-700 hover:bg-teal-900 text-white font-bold px-4 py-2" :to="{name: 'home.salas'}">
                        Ver Salas
                    </RouterLink>
                </div>
            </div>

            <div v-else>
                <p class="text-xl font-bold text-white">¿No Has Iniciado Sesion Aún?</p>

                <div class="flex gap-2 items-center justify-center mt-6">
                    <RouterLink class="block bg-white hover:bg-slate-100 text-teal-800 font-bold px-4 py-2" :to="{name: 'auth.register'}">
                        Crear Cuenta
                    </RouterLink>

                    <RouterLink class="block bg-teal-700 hover:bg-teal-900 text-white font-bold px-4 py-2" :to="{name: 'auth.login'}">
                        Iniciar Sesion
                    </RouterLink>
                </div>
            </div>
        </div>
    </section>

    <footer class="bg-emerald-200">
        <div class="container mx-auto px-4 py-6 flex items-center flex-col md:flex-row md:justify-between gap-6">
            <nav class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-4 gap-y-2 text-center md:text-left">
                <EnlaceDesktop 
                    v-for="enlace in enlaces" 
                    :enlace="enlace"
                /> 

                <EnlaceDesktop 
                    v-for="enlace in enlacesDashboard" 
                    :enlace="enlace"
                /> 

                <EnlaceDesktop 
                    v-if="authStore.isAuth"
                    v-for="enlace in enlacesUser" 
                    :enlace="enlace"
                    :params="{user: authStore.user.usuario}"
                /> 
            </nav>

            <p class="text-6xl relative pr-10 font-bold inline-block text-gray-800">
                Test
                <span class="text-2xl absolute top-0 right-0">Me</span>
                <span class="absolute bottom-0 right-1"><img :src="imagen" alt="Imagen de Logo" class="w-8 h-8"></span>
            </p>
        </div>

        <p class="text-center font-extrabold text-white p-4 bg-teal-800">
            Todos Los Derechos Reservados TestMe {{ new Date().getFullYear() }}&copy;
        </p>
    </footer>
</template>

<style scoped>
    .hero {
        min-height: 400px;
        max-height: 500px;
        background-image: url(/img/hero.png);
        background-position: center;
        background-size: cover;
        background-repeat: no-repeat;
    }

    @media (min-width: 768px) {
        .hero {
            min-height: 500px;
            max-height: 600px;
        }
    }

    .hero__container {
        background-color: rgba(0, 0, 0, 0.5);
    }
</style>