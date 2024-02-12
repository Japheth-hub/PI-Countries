const axios = require("axios");
const server = require("./src/server");
const { conn, Country } = require('./src/db.js');
const PORT = 3001;
const URL = 'http://localhost:5000/countries'

async function guardarDatos(){
  try {
    const { data } = await axios(URL);
    for(let country of data){
      await Country.create({
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

conn.sync({ force: true })
  .then(() => guardarDatos())
  .then(() => {
    server.listen(PORT, () => {
      console.log(`Server listening on port ${PORT}`);
    })
  })
  .catch(error => console.error(error))