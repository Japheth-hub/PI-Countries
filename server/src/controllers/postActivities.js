const { Country, Activity } = require('../db');


module.exports = async function newActivities(req, res) {
  try {

    const { name, dificult, duration, season, idPais } = req.body;

    if (![name, dificult, duration, season, idPais].every(Boolean)) {
      res.status(401).json({ message: 'Faltan datos' })
      return;
    }

    const [activity, create] = await Activity.findOrCreate({
      where: { name },
      defaults: { dificult, duration, season }
    });

    const pais = await Country.findByPk(idPais)

    if (!activity || !pais) {
      res.status(404).json({ message: 'Actividad o país no encontrado' });
      return;
    }

    await pais.addActivity(activity)

    if (create) {
      res.status(200).json({ message: 'Actividad creada con exito' })
    } else {
      res.status(300).json({ message: `Esta actividad ya existe` })
    }

  } catch (error) {
    res.status(500).json(error.message)
  }
}