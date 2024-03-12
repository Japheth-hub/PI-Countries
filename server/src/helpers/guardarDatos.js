const axios = require("axios");
const { Country } = require('../db');
const URL = 'http://localhost:5000/countries'


module.exports = async function guardarDatos() {
  try {
    const allCountries = await Country.findAll()
    console.log(allCountries.length)
    if(allCountries.length > 0){
      console.log('Carga exitosa')
      return
    }
    const { data } = await axios(URL);
    for (let country of data) {
      Country.create({
        id: country.cca3,
        name: country.name.common,
        flags: country.flags.svg,
        continent: country.region,
        capital: country.capital?.[0],
        subregion: country.subregion,
        area: country.area,
        population: country.population
      })
    }
    console.log('Datos guardados exitosamente');
  } catch (error) {
    console.log('Error al guardar los datos', error)
  }
}