const { Activity } = require('../db');

module.exports = async function deleteActivities(req, res) {

    try {
        const {name} = req.params;
        const rows = await Activity.destroy({where : {name}})

        if(rows){
            res.status(200).send('Actividad eliminada con exito')
        } else {
            res.status(404).send('Actividad no existe')
        }
    } catch (error) {
        res.json(error.message)
    }

}