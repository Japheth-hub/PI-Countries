const { Country, Activity } = require('../db');

module.exports = async function getCountries(req, res){
    try {

        // const { page } = req.params
        // if(page < 1 || page > 25){
        //     res.status(404).json({error: 'No existe esta pagina'})
        //     return;
        // }
        // const limit = 10;
        // const offset = (page - 1)*limit;
        // const allCountries = await Country.findAll({
        //     limit,
        //     offset
        // });

        const allCountries = await Country.findAll({
            // include: [
            //     {
            //         model: Activity,
            //         require: true
            //     }
            // ]
        });

        res.status(200).json(allCountries);
    } catch (error) {
        res.status(500).json(error.message)
    }
}