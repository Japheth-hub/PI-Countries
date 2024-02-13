const { Router } = require("express");
const {getCountries, getPais, getPaisName, postActivities, getActivities} = require('../controllers')

const router = Router();

router.get('/countries', getCountries);
router.get('/countries/name/', getPaisName);
router.get('/countries/:idPais', getPais);
router.get('/activities', getActivities);
router.post('/activities', postActivities);

module.exports = router;