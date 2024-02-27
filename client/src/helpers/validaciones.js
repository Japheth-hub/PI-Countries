export function validate(datos) {
  const { name, dificult, horas, minutos, season, paises } = datos
  const regex = /^[a-zA-Z0-9\s]{5,30}$/;
  const errores = [];
  if (!regex.test(name)) { errores.push('Nombre debe tener entre 5 y 30 caracteres de tipo Alfanumericos') }
  if (Number(dificult) === 0) { errores.push('La dificultad debe ser del nivel 1 (min) hasta 5 (max)')}
  if (horas > 6 ) { errores.push('Actividad debe tener un maximo de hasta 6 horas') }
  if (horas === 6 && minutos > 0) { errores.push('Actividad debe tener un maximo de hasta 6 horas') }
  if (horas === 0 && minutos < 30) { errores.push('Tiempo minimo para la actividad es de 30 Minutos') }
  if (season === 'Season') { errores.push('No ha seleccionado una temporada (Season)') }
  if (paises.length === 0) { errores.push('No se han seleccionado Paises para esta actividad') }

  return errores;
}

export function validateSeacrh(search) {
  const errorSearch = []
  const regex = /^[a-zA-Z\s]{1,20}$/;
  if (search === "") {
    errorSearch.push('El campo de busqueda esta vacio')
  }
  if (!regex.test(search)) {
    errorSearch.push('No ingresar carateres numericos ni caracteres especiales')
  }

  return errorSearch;
}