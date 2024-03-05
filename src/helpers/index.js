export function formatearFecha(fecha) {
    const fechaObj = new Date(fecha);

    return fechaObj.toLocaleDateString('es-MX', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    });
}

export function formatearVersion(version) {
    return `v${Number(version).toFixed(1)}`;
}

export function formatearMetaLinks(meta) {
    return meta.links.filter(link => link.label !== 'Next &raquo;' && link.label !== '&laquo; Previous');
}

export const enlacesDashboard = [
    {
        name: 'dashboard.admin',
        texto: 'Mi Espacio',
        middleware: ['auth', 'teacher']
    },
    {
        name: 'dashboard.tests',
        texto: 'Tests',
        middleware: ['auth', 'teacher']
    },
    {
        name: 'dashboard.salas',
        texto: 'Salas',
        middleware: ['auth', 'teacher']
    },
];

export const enlacesUser = [
    {
        name: 'user.visitas',
        texto: 'Tests Respondidos',
        middleware: ['auth'],
        params: ['user'],
    },
    {
        name: 'user.salas',
        texto: 'Mis Salas',
        middleware: ['auth'],
        params: ['user'],
    },
    {
        name: 'user.admin',
        texto: 'Mi Cuenta',
        middleware: ['auth'],
        params: ['user'],
    },
];

export const enlaces = [
    {
        name: 'home.tests',
        texto: 'Tests',
        middleware: ['auth'],
        params: [],
    },
    {
        name: 'home.salas',
        texto: 'Salas',
        middleware: ['auth'],
        params: [],
    },
    {
        name: 'dashboard.admin',
        texto: 'Mi Espacio',
        middleware: ['teacher'],
        params: [],
    },
    {
        name: 'auth.login',
        texto: 'Iniciar Sesion',
        middleware: ['guest'],
        params: [],
    },
    {
        name: 'auth.register',
        texto: 'Crear Cuenta',
        middleware: ['guest'],
        params: [],
    }
]