const { Country, Activity } = require('../db');


module.exports = async function newActivities(req, res) {
  try {

    const { name, dificult, duration, season, paises } = req.body;

    if (![name, dificult, duration, season, paises].every(Boolean)) {
      res.status(401).json({ message: 'Faltan datos' })
      return;
    }

    const [activity, create] = await Activity.findOrCreate({
      where: { name },
      defaults: { dificult, duration, season }
    });
    
    if (create) {
      for(let idPais of paises){
        const pais = await Country.findByPk(idPais)
        await pais.addActivity(activity)
      }
      res.status(200).json({ message: 'Actividad creada con exito' })
    } else {
      res.status(300).json({ message: `Esta actividad ya existe` })
    }

  } catch (error) {
    res.status(500).json(error.message)
  }
}