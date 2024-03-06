const { Router } = require("express");
const { getCountries, getPais, getPaisName, postActivities, getActivities, deleteActivities, deleteRelacion } = require('../controllers');

const router = Router();

router.get('/countries', getCountries);
router.get('/countries/name/', getPaisName);
router.get('/countries/:idPais', getPais);
router.get('/activities', getActivities);
router.post('/activities', postActivities);
router.delete('/activities/:name', deleteActivities)
router.delete('/relacion', deleteRelacion)
// router.post('/relacion/', deleteActivities)



module.exports = router;