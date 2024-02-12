const { Country } = require('../db');
const { Op } = require('sequelize');


module.exports = async function getPaisName(req, res){
    try {
        const {name} = req.query;

        const paises = await Country.findAll({
            where: {
                name: {
                    [Op.iLike]: `%${name}%`
                }
            }
        })

        if(paises.length === 0){
            res.status(404).json({error: 'No se encontro ningun resultado'})
            return;
        }

        res.status(200).json(paises)

    } catch (error) {
        res.status(500).json(error.message)
    }
}