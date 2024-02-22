const { Activity, Country } = require('../db');

module.exports = async function getActivities(req, res) {
  try {

    const allActivities = await Activity.findAll({
      include: [
        {
          model: Country,
          required: true
        }
      ]
    });
    if (allActivities.length === 0) {
      res.status(200).json({ message: 'No hay actividades' });
      return;
    }
    res.status(200).json(allActivities);

  } catch (error) {
    res.status(500).json(error.message);
  }
}