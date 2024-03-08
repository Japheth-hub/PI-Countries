const server = require("./src/server");
const { conn } = require('./src/db.js');
const guardarDatos = require('./src/helpers/guardarDatos')
const port = process.env.PORT || 3001;


conn.sync({ force: true })
  .then(() => guardarDatos())
  .then(() => {
    server.listen(port, () => {
      console.log(`Server listening on port ${port}`);
    })
  })
  .catch(error => console.error(error))