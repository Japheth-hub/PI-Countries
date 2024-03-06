const getCountries = require('./getCountries');
const getPais = require('./getPais');
const getPaisName = require('./getPaisName');
const getActivities = require('./getActivities');
const postActivities = require('./postActivities');
const deleteActivities = require('./deleteActivities');
const deleteRelacion = require('./deleteRelacion');


module.exports = {
  getCountries,
  getPais,
  getPaisName,
  getActivities,
  postActivities,
  deleteActivities,
  deleteRelacion
}