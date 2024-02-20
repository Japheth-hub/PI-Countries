const { Country, Activity } = require('../db');

module.exports = async function newActivities(req, res){
    try {
        const {name, dificult, duration, season, idPais} = req.body;

        if(![name, dificult, duration, season, idPais].every(Boolean)){
            res.status(401).json({message: 'Faltan datos'})
            return;
        }

        const [activity, create] = await Activity.findOrCreate({
            where: {name, dificult, duration, season}
        });

        const actividad = await Activity.findOne({
            where: {name}
        })

        const pais = await Country.findByPk(idPais)

        if (!actividad || !pais) {
            res.status(404).json({ message: 'Actividad o país no encontrado' });
            return;
        }
        
        await pais.addActivity(actividad)

        if(create){
            res.status(200).json({message: 'Actividad creada'})
        } else {
            res.status(300).json({message: 'Actividad ya existe'})
        }

    } catch (error) {
        res.status(500).json(error.message)
    }
}