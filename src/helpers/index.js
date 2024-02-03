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

export const enlaces = [
    {
        name: 'home.tests',
        texto: 'Tests',
        middleware: ['auth']
    },
    {
        name: 'home.salas',
        texto: 'Salas',
        middleware: ['auth']
    },
    {
        name: 'dashboard.admin',
        texto: 'Mi Espacio',
        middleware: ['teacher']
    }
]