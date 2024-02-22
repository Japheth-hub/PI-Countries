const { Country, Activity } = require('../db');

module.exports = async function getCountries(req, res) {
  try {

    const allCountries = await Country.findAll({
      include: [
        {
          model: Activity,
          require: true
        }
      ]
    });
    res.status(200).json(allCountries);

  } catch (error) {
    res.status(500).json(error.message);
  }
}