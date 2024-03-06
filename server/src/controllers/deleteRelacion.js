const { Activity, Country } = require('../db');

module.exports = async function deleteRelacion (req, res){
    try {
        const {name, pais} = req.query
        
        const activity = await Activity.findOne({where: {name}})
        const country = await Country.findByPk(pais, {
            includes: [{
                model: Activity,
                require: true
            }]
        })

        if(!activity){
            res.status(404).send('Actividad no existe')
            return
        }
        if(!country){
            res.status(404).send('Pais no existe')
            return
        }

        await country.removeActivity(activity);

        res.status(200).json({
            message: "Actividad eliminada de este pais",
            country
        })

    } catch (error) {
        res.json(error)
    }



}