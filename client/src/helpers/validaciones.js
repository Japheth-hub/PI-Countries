export default function validate(datos) {
    const { name, horas, minutos, season, paises } = datos
    const regex = /^[a-zA-Z0-9\s]{5,30}$/;
    const errores = [];
    if (!regex.test(name)) { errores.push('Nombre debe tener entre 5 y 30 caracteres de tipo Alfanumericos') }
    if (horas >= 6 && minutos > 0) { errores.push('Actividad debe tener un maximo de hasta 6 horas') }
    if (horas === 0 && minutos < 30) { errores.push('Tiempo minimo para la actividad es de 30 Minutos')}
    if (season === 'Season') { errores.push('No ha seleccionado una temporada (Season)') }
    if (paises.length === 0) { errores.push('No se han seleccionado Paises para esta actividad') }

    return errores;
}