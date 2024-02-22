const server = require("./src/server");
const { conn } = require('./src/db.js');
const guardarDatos = require('./src/helpers/guardarDatos')
const PORT = 3001;


conn.sync({ force: true })
  .then(() => guardarDatos())
  .then(() => {
    server.listen(PORT, () => {
      console.log(`Server listening on port ${PORT}`);
    })
  })
  .catch(error => console.error(error))