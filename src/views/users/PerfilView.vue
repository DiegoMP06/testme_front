<script setup>
    import usePerfil from '@/composables/users/usePerfil';
    import Spinner from '@/components/UI/Spinner.vue';
    import SalaPerfil from '@/components/salas/mostrar/SalaPerfil.vue';

    const {
        cargando,
        user,
        isProfesor,
        hasSalas,
        hasEnlacesSalas,
    } = usePerfil();
</script>

<template>
    <Spinner v-if="cargando" />

    <div v-else>
        <div class="bg-teal-800 p-6 mb-12 md:mb-0 rounded shadow-lg">
            <div class="flex flex-col md:flex-row md:gap-4 md:items-center">
                <div class="md:w-1/3 rounded-full overflow-hidden border-4 border-white">
                    <img 
                    class="w-full h-full"
                    src="/img/perfil.webp" 
                    alt="Imagen de Perfil"
                    />
                </div>
                
                <div class="flex-1 translate-y-12 md:translate-y-0 bg-white p-4 rounded z-0 divide-y-2 divide-slate-300 shadow-xl">
                    <div class="p-2">
                        <p class="text-slate-700 font-extrabold text-lg text-center md:text-left md:text-2xl">
                            {{ `${user.name} ${user.apellido_paterno} ${user.apellido_materno}` }}
                        </p>
                        
                        <p class="text-xs md:text-base font-bold text-slate-700 text-center md:text-left">
                            {{ user.usuario }}
                        </p>
                    </div>
                    
                    <div class="p-2">
                        <p class="flex gap-2 items-center font-bold text-lg justify-center md:justify-start">
                            <svg v-if="isProfesor" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M12 6.042A8.967 8.967 0 0 0 6 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 0 1 6 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 0 1 6-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0 0 18 18a8.967 8.967 0 0 0-6 2.292m0-14.25v14.25" />
                            </svg>
                            
                            <svg v-else xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M4.26 10.147a60.438 60.438 0 0 0-.491 6.347A48.62 48.62 0 0 1 12 20.904a48.62 48.62 0 0 1 8.232-4.41 60.46 60.46 0 0 0-.491-6.347m-15.482 0a50.636 50.636 0 0 0-2.658-.813A59.906 59.906 0 0 1 12 3.493a59.903 59.903 0 0 1 10.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.717 50.717 0 0 1 12 13.489a50.702 50.702 0 0 1 7.74-3.342M6.75 15a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Zm0 0v-3.675A55.378 55.378 0 0 1 12 8.443m-7.007 11.55A5.981 5.981 0 0 0 6.75 15.75v-1.5" />
                            </svg>                          
                            {{ user.cargo.cargo }}
                        </p>
                    </div>
                </div>
            </div>
        </div>

        <div class="mt-4 flex flex-col lg:flex-row gap-4">
            <div class="lg:w-1/3">
                <aside class="p-4 bg-white rounded shadow">
                    <blockquote>
                        {{ user.biografia }}
                    </blockquote>
                    
                    <div class="grid gap-2">
                        <h2 class="text-xl font-bold text-teal-800">Datos Personales</h2>
                        
                        <div class="divide-y-2 divide-slate-300">
                            <p class="text-slate-700 font-bold p-2 flex gap-2 items-center">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z" />
                                </svg>                                                                    
                                Telefono: 
                                <span class="font-normal">
                                    {{ user.telefono ? user.telefono : 'No Disponible' }}
                                </span>
                            </p>
                            
                            <p class="text-slate-700 font-bold p-2 flex gap-2 items-center">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M16.5 12a4.5 4.5 0 1 1-9 0 4.5 4.5 0 0 1 9 0Zm0 0c0 1.657 1.007 3 2.25 3S21 13.657 21 12a9 9 0 1 0-2.636 6.364M16.5 12V8.25" />
                                </svg>
                                Email: 
                                <span class="font-normal">
                                    {{ user.email ? user.admin : 'No Disponible' }}
                                </span>
                            </p>
                        </div>
                    </div>
                </aside>
            </div>
            
            <div class="flex-1 p-4 bg-white rounded shadow grid gap-6">
                <div v-if="isProfesor">
                    <h3 class="text-xl font-bold text-slate-700 mb-4">
                        Salas del Usuario
                    </h3>

                    <div class="grid gap-4">
                        <SalaPerfil 
                            v-if="hasSalas"
                            v-for="sala in user.salas"
                            :sala="sala"
                        />

                        <p v-else class="text-center font-semibold my-10">Este Usuario No Tiene Salas</p>
                    </div>
                </div>

                <div>
                    <h3 class="text-xl font-bold text-slate-700 mb-4">
                        Salas Donde es Miembro
                    </h3>

                    <div class="grid gap-4">
                        <SalaPerfil 
                            v-if="hasEnlacesSalas"
                            v-for="sala in user.enlacesSalas"
                            :sala="sala"
                        />

                        <p v-else class="text-center font-semibold my-10">Este Usuario no es Miembro de Ninguna Sala</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>

</style>